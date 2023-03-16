// importing express async handler
const expressAsyncHandler = require("express-async-handler");

// importing sequelize
const sequelize = require("../db/db.config");

// importing bcryptjs
const bcryptjs = require("bcryptjs");

// importing user model
const { User } = require("../models/user.model");

// importing json web token for authentication
const jwt = require("jsonwebtoken");

// importing nodemailer for sending forgot password email
const nodemailer = require("nodemailer");

// importing models
const { Employee } = require("../models/employee.model");

// importing dot environment file
require("dotenv").config();

const register = expressAsyncHandler(async (req, res) => {
  // getting the data
  let { userId, email, password } = req.body;

  let find = await Employee.findOne({
    where: {
      id: userId,
    },
  });

  // find user in employee
  if (find == undefined) {
    res.status(200).send({
      Message: "Not an employee!",
    });
  }

  // if user is an employee
  else {
    //  find user record in users db
    let userRecord = await User.findOne({
      where: {
        email: email,
      },
    });

    // if user already exits
    if (userRecord != undefined) {
      res.status(302).send({ Message: "User already exists!" });
    }

    //else insert into users
    else {
      // hashing password
      let hashedPassword = await bcryptjs.hash(password, 6);
      req.body.password = hashedPassword;
      await User.create(req.body);
      delete req.body.password
      res.status(200).send({ Message: "User Registered", payload: req.body });
    }
  }
});

// login controller

const login = expressAsyncHandler(async (req, res) => {
  // getting data
  const { userId, password } = req.body;

  let userRecord = await User.findOne({
    where: {
      userId: userId,
    },
  });

  if (userRecord == undefined) {
    res.status(204).send({ Message: "User not found!" });
  }
  // verify password
  else {
    let pass = await bcryptjs.compare(password, userRecord.dataValues.password);
    // if password not matched
    if (!pass) {
      res.status(400).send({ Message: "Incorrect password" });
    } else {
      // signed token
      let signedToken = jwt.sign(
        {
          userId: userRecord.dataValues.userId,
          userRole: userRecord.dataValues.role,
        },
        process.env.SECRET_KEY,
        {
          expiresIn: 86400,
        }
      );
      res.status(200).send({
        Message: "Login successful!",
        payload: signedToken,
      });
    }
  }
});

const otps = {};

const forgotPassword = expressAsyncHandler(async (req, res) => {
  const { email } = req.body;

  // generate random otp
  const otp = Math.floor(100000 + Math.random() * 900000);

  // saving otp to email object
  otps[email] = otp;
  var mail = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "neerajnishad5@gmail.com",
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // providing necessary details for mail
  var mailOptions = {
    from: "neerajnishad5@gmail.com",
    to: "thesnippetguy@gmail.com",
    subject: "Reset Password OTP",
    text: "OTP for account password reset: " + otp,
  };

  mail.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("Error occured: " + error);
    } else {
      console.log("Email sent!");
    }
  });
  res.status(200).send({ Message: "OTP has been sent!", payload: otp });
});

const resetPassword = expressAsyncHandler(async (req, res) => {
  // getting otp and password
  const { email, otp, password } = req.body;

  if (otp === otps[email]) {
    const hashedPassword = await bcryptjs.hash(password, 7);
    let updateCount = await User.update(
      {
        password: hashedPassword,
      },
      {
        where: {
          email: email,
        },
      }
    );
    res.status(200).send({ Message: "Password reset complete!" });
  } else {
    res.status(304).send({ Message: "Password not reset!" });
  }
});

module.exports = { login, register, resetPassword, forgotPassword };

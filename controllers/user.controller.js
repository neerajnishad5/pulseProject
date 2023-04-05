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
  if (find == null) {
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

    // if user already exists
    if (userRecord != null) {
      res.status(302).send({ Message: "User already exists!" });
    }

    //else insert into users
    else {
      // hashing password
      let hashedPassword = await bcryptjs.hash(password, 6);
      req.body.password = hashedPassword;
      await User.create(req.body);
      delete req.body.password;
      res.status(200).send({ Message: "User Registered", payload: req.body });
    }
  }
});

// login controller

const login = expressAsyncHandler(async (req, res) => {
  // getting data
  const { userId, email, password } = req.body;

  let userRecord = await User.findOne({
    where: {
      email: email,
    },
  });
  // console.log("userId: user record", userRecord);

  // if user is null
  if (userRecord == null) {
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

      // sending back response
      res.status(200).send({
        Message: "Login successful!",
        token: signedToken,
        user: userRecord,
      });
    }
  }
});


// object to store otp
let otps = {};

const forgotPassword = expressAsyncHandler(async (req, res) => {
  const { email } = req.body;

  // generate random otp
  let otp = Math.floor(100000 + Math.random() * 900000);

  // saving otp to email object
  otps[email] = otp;
  var mail = nodemailer.createTransport({
    service: process.env.SERVICE,
    auth: {
      user: process.env.SENDER_EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // providing necessary details for mail
  var mailOptions = {
    from: process.env.SENDER_EMAIL,
    to: process.env.TO_MAIL,
    subject: "RESET PASSWORD | Pulse received a request to reset your password",
    text: `Hi ${email}, your OTP for resetting your password: ${otp}.\nIf you didn't request a password reset, you can ignore this email. Your password will not be changed. Thank you, PULSE`,
  };

  // sending mail and catching error
  mail.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("Error occured: " + error);
    } else {
      console.log("Email sent!");
    }
  });

  // sending back otp
  res.status(200).send({ Message: "OTP has been sent!", payload: otp });
});

const resetPassword = expressAsyncHandler(async (req, res) => {
  // getting otp and password
  let { email, otp, password } = req.body;

  // if otp matched then create password and save to db
  if (otp == otps[email]) {
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

    // sending back password reset complete response
    res.status(200).send({ Message: "Password reset complete!" });
  } else {
    // sending password not reset message
    res.status(200).send({ Message: "Password not reset!" });
  }
});

module.exports = { login, register, resetPassword, forgotPassword };

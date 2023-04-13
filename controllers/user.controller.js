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

//  USER REGISTER
const register = expressAsyncHandler(async (req, res) => {
  // getting the data
  let { userId, email, password } = req.body;

  // finding employee by userId
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

// USER LOGIN

const login = expressAsyncHandler(async (req, res) => {
  // getting data
  const { email, password } = req.body;

  //  finding whether employee with email exist
  let userRecord = await User.findOne({
    where: {
      email: email,
    },
  });
  // console.log("userId: user record", userRecord);

  // if user is null
  if (userRecord == null) {
    res.send({ Message: "User not found!" });
  }
  // verify password
  else {
    // comparing password with db password
    let pass = await bcryptjs.compare(password, userRecord.dataValues.password);
    // if password not matched
    if (!pass) {
      // if password not true sending response
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

// USER FORGOT PASSWORD
const forgotPassword = expressAsyncHandler(async (req, res) => {
  const { email } = req.body;

  // finding user by that email exist in db or not
  const findUser = await User.findOne({
    where: {
      email: email,
    },
  });

  // if user doesn't exist
  if (findUser === null) {
    // sending back response
    res.status(200).send({ Message: "User not found!" });
  } else {
    // if user exist create a one time link valid for 15 mins

    const payload = {
      email: email,
    };

    // generating token from JWT
    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "15m",
    });
    // console.log("Token generated: ", token);

    // generating link from token
    const link = `http://localhost:3000/reset-password/${findUser.email}/${token}`;
    // console.log("Link generated:", link);

    // initializing mail
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
      subject:
        "RESET PASSWORD | Pulse received a request to reset your password",
      text: `Hi ${email}, link for resetting your password: ${link}.\nIf you didn't request a password reset, you can ignore this email. Your password will not be changed. Thank you, WAL PULSE`,
    };

    // sending mail and catching error
    mail.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log("Error occured: " + error);
        res.status(200).send({ Message: error });
      } else {
        console.log("Email sent!", info.response);
        // sending back response
        res
          .status(200)
          .send({ Message: "Email has been sent!", link: link, token: token });
      }
    });
  }
});

//  USER RESET PASSWORD
const resetPassword = expressAsyncHandler(async (req, res) => {
  // getting email and token
  let { email, token } = req.params;
  let { password } = req.body;

  // finding user by email if exists
  const findUser = await User.findOne({
    where: {
      email: email,
    },
  });

  try {
    // getting the original payload from jwt if token is valid
    const payload = jwt.verify(token, process.env.SECRET_KEY);

    // checking if mail is same as db
    if (payload.email === findUser.email) {
      const hashedPassword = await bcryptjs.hash(password, 7);

      // updating password
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
      if (updateCount > 0) {
        res.status(200).send({ Message: "Password reset complete!" });
      }
    } else {
      // sending password not reset message
      res.status(200).send({ Message: "Password not reset!" });
    }
  } catch (error) {
    console.log("Error in reset password: ", error.message);
  }
});

// exporting controllers
module.exports = {
  login,
  register,
  resetPassword,
  forgotPassword,
};

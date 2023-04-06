// import express library
const express = require("express");
// calling router function on epxress
const user = express.Router();

// importing all the controllers
const {
  register,
  login,
  resetPassword,
  forgotPassword,
} = require("../controllers/user.controller"); 
 

// importing register controller
user.post("/register", register);

// importing login controller
user.post("/login", login);

// importing reset password controller
user.put("/reset-password/:email/:token", resetPassword);
 
// importing forgot password controller
user.post("/forgot-password", forgotPassword);


// exporting user API
module.exports = user;

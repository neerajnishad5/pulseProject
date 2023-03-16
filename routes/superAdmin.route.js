// import express library
const express = require("express");


// calling router function on epxress
const superAdmin = express.Router();


// importing all the controllers
const {
  assignRole,
  getAllUsers,
  unassignedUsers,
} = require("../controllers/superAdmin.controller");

// assign roles to users route
superAdmin.put("/assign-role", assignRole);

// get all users route
superAdmin.get("/all-users", getAllUsers);

// get all unassigned users route
superAdmin.get("/unassigned-users", unassignedUsers);

// exporting super admin api
module.exports = superAdmin;

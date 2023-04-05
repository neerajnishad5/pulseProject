// import express library
const express = require("express");

// calling router function on epxress
const specialUser = express.Router();

// importing controllers
const {
  getAllProjects,
  detailedProjectView,
  createProject,
  updateProject,
  deleteProject,
  allResourceRequestForProject,
  deleteResourceRequest,
} = require("../controllers/specialUser.controller");

// routes for special user

// login view when special user logs this is that dashboard
specialUser.get("/all-projects", getAllProjects);

// get detailed view of a project by project id
specialUser.get("/detailed-view/project/:projectId", detailedProjectView);

// create project route
specialUser.post("/create-project", createProject);

// update project route
specialUser.put("/update-project/project/:projectId", updateProject);

// delete project route
specialUser.delete("/delete-project/project/:projectId", deleteProject);

// all resource requests
specialUser.get("/all-resource-requests", allResourceRequestForProject);

specialUser.delete("/delete-resource-request/:id", deleteResourceRequest);

module.exports = specialUser;

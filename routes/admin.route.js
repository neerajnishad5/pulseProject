// import express library
const express = require("express");

// calling router function on epxress
const admin = express.Router();

// importing controllers
const {
  getAllProjects,
  detailedProjectView,
  createProject,
  updateProject,
  deleteProject,
  allResourceRequestForProject,
  deleteResourceRequest,
} = require("../controllers/admin.controller");

// routes for special user

// login view when special user logs this is that dashboard
admin.get("/all-projects", getAllProjects);

// get detailed view of a project by project id
admin.get("/detailed-view/project/:projectId", detailedProjectView);

// create project route
admin.post("/create-project", createProject);

// update project route
admin.put("/update-project/project/:projectId", updateProject);

// delete project route
admin.delete("/delete-project/project/:projectId", deleteProject);

// all resource requests
admin.get("/all-resource-requests", allResourceRequestForProject);

admin.delete("/delete-resource-request/:id", deleteResourceRequest);

module.exports = admin;

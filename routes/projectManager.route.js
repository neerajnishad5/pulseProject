// import express library
const express = require("express");

// calling router function on epxress
const projectManager = express.Router();

// importing controllers
const {
  allProjectsUnderProjectManager,
  detailedProjectView,
  deleteProjectConcern,
  raiseProjectConcern,
  udpateProjectConcern,
  raiseProjectUpdate,
} = require("../controllers/projectManager.controller");

// routes for project manager

//  get all projects under project manager
projectManager.get(
  "/all-projects/:id",
  allProjectsUnderProjectManager
);

// get detailed view of project
projectManager.get("/detailed-project-view/project/:id", detailedProjectView);

// raise a concern for a project
projectManager.post("/raise-project-concern/project/:id", raiseProjectConcern);

// raise a update for a project
projectManager.post("/raise-project-update/project/:id", raiseProjectUpdate);

// update a project concern
projectManager.put(
  "/update-project-concern/update/project/:id",
  udpateProjectConcern
);

// delete a project concern
projectManager.delete(
  "/delete-project-concern/:id",
  deleteProjectConcern
);

// exporting project manager api
module.exports = projectManager;

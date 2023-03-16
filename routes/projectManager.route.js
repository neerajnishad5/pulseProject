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
 
} = require("../controllers/projectManager.controller");

// routes for project manager

//  get all projects under project manager
projectManager.get(
  "/projects-under-project-manager/:id",
  allProjectsUnderProjectManager
);

// get detailed view of project
projectManager.get(
  "/detailed-project-view/project/:id",
  detailedProjectView
);

// raise a concern for a project
projectManager.post(
  "/raise-project-concern/project/:id",
  raiseProjectConcern
);

// update a project concern
projectManager.put(
  "/update-project-concern/update/project/:id",
  udpateProjectConcern
);

// delete a project concern
projectManager.delete(
  "/delete-project-concern/project/:id",
  deleteProjectConcern
);
 

// exporting project manager api
module.exports = projectManager;

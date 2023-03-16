// import express library
const express = require("express");

// calling router function on epxress
const gdo = express.Router();


// importing controllers
const {
  allProjectsUnderGdo,
  deleteMember,
  makeResourceRequest,
  updateMember,
  assignProjectToEmployee, 
  detailedProjectView,
  createProject,
  raiseProjectUpdate
} = require("../controllers/gdo.controller");

// get all projects under gdo
gdo.get("/:gdoId/all-projects", allProjectsUnderGdo);

// make resource request
gdo.post("/resource-request", makeResourceRequest);

// update team  member
gdo.put("/update-member/:id", updateMember);

// delete member from project
gdo.delete("/delete-member/:id", deleteMember);

// assign project
gdo.post("/assign-project", assignProjectToEmployee);

// get detailed project view
gdo.get("/gdoId/:gdoId/detailed-project-view/project/:projectId", detailedProjectView);

// create a project route
gdo.post("/create-project", createProject)

// raise a project update
gdo.put("/raise-project-update", raiseProjectUpdate)

// exporting gdo api
module.exports = gdo;

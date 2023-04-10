// importing expressAsyncHandler
const expressAsyncHandler = require("express-async-handler");

// importing project model
const { Project } = require("../models/project.model");

// importing dotenv file
require("dotenv").config();

// import project update model
const { ProjectUpdate } = require("../models/projectUpdate.model");

// import project team composition model
const { ProjectTeamComposition } = require("../models/teamComposition.model");

// import project concern model
const { ProjectConcern } = require("../models/projectConcern.model");

// project can have multiple project updates
Project.ProjectUpdate = Project.hasMany(ProjectUpdate, {
  foreignKey: {
    name: "projectId",
  },
});

// project can have multiple concerns

Project.ProjectConcern = Project.hasMany(ProjectConcern, {
  foreignKey: {
    name: "projectId",
  },
});

// project can have many team

Project.ProjectTeamComposition = Project.hasMany(ProjectTeamComposition, {
  foreignKey: {
    name: "projectId",
  },
});

// importing nodemailer

const nodemailer = require("nodemailer");

/*
// update a project
const updateProject = expressAsyncHandler(async (req, res) => {
  // getting the data
  let update = req.body;

  // updating and storing update count
  let updateCount = await Project.update(update, {
    where: {
      projectId: update.projectId,
    },
  });

  // if no project udpated
  if (updateCount > 0) {
    // sending back response
    res.status(200).send({ Message: "Project updated!" });
  } else res.status(204).send({ Message: "No project updated!" });
});
*/

// all projects under project manager
const allProjectsUnderProjectManager = expressAsyncHandler(async (req, res) => {
  // get project id from parameters
  const id = req.params.id;

  // getting all the projects from Project model
  let projects = await Project.findAll({
    where: {
      projectManager: id,
      status: true,
    },
  });

  // if projects is empty so no projects under project manager
  if (projects.length === 0) {
    res.status(204).send({ Message: "No projects exists!" });
  } else {
    // sending back response
    res.status(200).send({
      message: "All projects for Project Manager!",
      payload: projects,
    });
  }
});

// detailed project view of a project

const detailedProjectView = expressAsyncHandler(async (req, res) => {
  // particular project id
  const id = req.params.id;

  // getting the detailed view through associations
  let detailView = await Project.findOne({
    where: {
      projectId: id,
      status: true,
    },
    include: [
      {
        association: Project.ProjectUpdate,
      },
      {
        association: Project.ProjectConcern,
      },
      {
        association: Project.ProjectTeamComposition,
      },
    ],
  });

  let singleProject = await Project.findOne({
    where: {
      projectId: id,
      status: true,
    },
  });
  // sending back response
  res
    .status(200)
    .send({
      Message: "detailed project view!",
      payload: detailView,
      singleProject: singleProject,
    });
});
/*
// delete  a project update
const deleteProjectUpdate = expressAsyncHandler(async (req, res) => {
  const id = req.params.id;

  await ProjectUpdate.destroy({
    where: {
      projectId: id,
    },
  });
  res.status(200).send({ Message: "Project update deleted!" });
});
*/

// delete project concern
const deleteProjectConcern = expressAsyncHandler(async (req, res) => {
  // getting concern id
  const id = req.params.id;

  // deleting project concern by id
  await ProjectConcern.destroy({
    where: {
      id: id,
    },
  });
  // sending back response
  res.status(200).send({ Message: "Project concern deleted!" });
});

// update project concern
const udpateProjectConcern = expressAsyncHandler(async (req, res) => {
  // getting id
  const id = req.params.id;
  const data = req.body;
  // updating project
  const updateCount = await ProjectConcern.update(data, {
    where: {
      projectId: id,
    },
  });
  // sending back response
  res.status(200).send({ Message: "Project concern updated!" });
});

// raise a project concern
const raiseProjectConcern = expressAsyncHandler(async (req, res) => {
  // getting all the data from body
  const {
    projectId,
    concernDescription,
    raisedBy,
    severityOfConcern,
    projectManager,
  } = req.body;

  // adding data to the project concern table
  const data = req.body;
  console.log(data);
  await ProjectConcern.create(data);

  // defining mail object and calling transport function on nodemailer
  var mail = nodemailer.createTransport({
    service: process.env.SERVICE,
    auth: {
      user: process.env.SENDER_EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // providing necessary details
  let mailOptions = {
    from: process.env.SENDER_EMAIL,
    to: process.env.TO_MAIL,
    subject: `PROJECT CONCERN RAISED | Project ID: ${projectId}`,
    text: `Hi Admin,
     Project concern is raised by ${raisedBy}.
     Concern description: ${concernDescription}
     Severity of concern: ${severityOfConcern}`,
  };

  // calling sendMail function on mail object

  mail.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("Error occured: " + error);
    } else {
      console.log("Email sent!", info.response);
    }
  });

  // sending response back
  res.status(201).send({ Messsage: "Project concern raised!" });
});

// raise project update
const raiseProjectUpdate = expressAsyncHandler(async (req, res) => {
  // get data from body
  // let id = req.params.id;
  let updates = req.body;

  // add data to project update table
  await ProjectUpdate.create(updates);

  // sending back response
  res.send({ Message: "Project updated posted!", payload: updates });
});

// exporting all controllers
module.exports = {
  allProjectsUnderProjectManager,
  detailedProjectView,
  deleteProjectConcern,
  raiseProjectConcern,
  udpateProjectConcern,
  raiseProjectUpdate,
  // updateProject,
  // deleteProjectUpdate,
};

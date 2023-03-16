// importing expressAsyncHandler
const expressAsyncHandler = require("express-async-handler");

// importing project model
const { Project } = require("../models/project.model");

// importing project updates model
const { ProjectUpdate } = require("../models/projectUpdate.model");

const { ProjectTeamComposition } = require("../models/teamComposition.model");

// importing project concerns
const { ProjectConcern } = require("../models/projectConcern.model");

// importing resource request db

const { ResourceRequest } = require("../models/resourceRequest.model");

// defining associations

// project can have multiple project updates: one to many
Project.ProjectUpdate = Project.hasMany(ProjectUpdate, {
  foreignKey: {
    name: "projectId",
  },
});

// project can have multiple concerns: one to many

Project.ProjectConcern = Project.hasMany(ProjectConcern, {
  foreignKey: {
    name: "projectId",
  },
});

// project can have many team : one to many

Project.ProjectTeamComposition = Project.hasMany(ProjectTeamComposition, {
  foreignKey: {
    name: "projectId",
  },
});

// creating project
const createProject = expressAsyncHandler(async (req, res) => {
  // inserting project into projects table;
  const project = req.body;
  let insert = await Project.create(project);
  res.status(201).send({ Message: "Project created!" });
});

// get all running projects
const getAllProjects = expressAsyncHandler(async (req, res) => {
  // getting projects only running
  const projects = await Project.findAll({
    where: {
      status: true,
    },
    attributes: {
      exclude: ["status", "gdoId"],
    },
  });

  // if no projects found
  if (projects.length == 0) {
    res.status(204).send({ Message: "No projects available!" });
  } else {
    res.status(200).send({ Message: "All projects!", projects });
  }
});

const updateProject = expressAsyncHandler(async (req, res) => {
  // getting the data
  let update = req.body;

  // updating and storing update count
  let updateCount = await Project.update(update, {
    where: {
      projectId: update.projectId,
    },
  });

  if (updateCount > 0) {
    res.status(200).send({ Message: "Project updated!" });
  } else res.status(204).send({ Message: "No project updated!" });
});

// soft delete for projects to set status = false
const deleteProject = expressAsyncHandler(async (req, res) => {
  // get id  from parameters
  const id = req.params.projectId;
  
  // soft delete project
  const updateCount = await Project.update(
    {
      status: false,
    },
    {
      where: {
        projectId: id,
      },
    }
  );

  if (updateCount > 0) {
    res.status(200).send({ Message: "Project deleted!", payload: id });
  } else {
    res.status(204).send({ Message: "Nothing to delete!" });
  }
});

// detailed view of a project
const detailedProjectView = expressAsyncHandler(async (req, res) => {
  // particular project id
  const id = req.params.projectId;

  // get project data including other table data
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
        association: Project.ProjectTeamComposition,
      },
    ],
  });

  // sending back response
  res.status(200).send({
    Message: "Project detailed view!",
    payload: detailView,
  });
});

// get resource request  for a project
const allResourceRequestForProject = expressAsyncHandler(async (req, res) => {
  // get project id from parameters
  const id = req.params.projectId;

  // get all the requests from resource request table
  const requests = await ResourceRequest.findAll();
  // sending back response
  res.status(200).send({ Message: "Resource requests!", payload: requests });
});

// exporting all the controllers
module.exports = {
  createProject,
  getAllProjects,
  updateProject,
  deleteProject,
  detailedProjectView,
  allResourceRequestForProject,
};

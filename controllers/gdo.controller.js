// importing expressAsyncHandler
const expressAsyncHandler = require("express-async-handler");

// importing project model
const { Project } = require("../models/project.model");

// importing resource request model
const { ResourceRequest } = require("../models/resourceRequest.model");

// importing team composition model
const { ProjectTeamComposition } = require("../models/teamComposition.model");

// importing project updates model

const { ProjectUpdate } = require("../models/projectUpdate.model");

// importing project concern table
const { ProjectConcern } = require("../models/projectConcern.model");

// associations

// Project.ProjectConcern = Project.hasMany(ProjectConcern, {
//   foreignKey: {
//     name: projectId,
//   },
// });

// Project.ProjectTeamComposition = Project.hasOne(ProjectTeamComposition, {
//   foreignKey: {
//     name: projectId,
//   },
// });

// make resourcing request
const makeResourceRequest = expressAsyncHandler(async (req, res) => {
  // get data from request body
  const data = req.body;
  console.log(data);
  await ResourceRequest.create(data);
  res.status(201).send({ Message: "Reource request made!" });
});

// all projects under gdo
const allProjectsUnderGdo = expressAsyncHandler(async (req, res) => {
  const id = req.params.gdoId;

  // get all the projects under gdo
  let projects = await Project.findAll({
    where: {
      gdoId: id,
      status: true,
    },
  });

  // if projects array length is 0
  if (projects.length === 0) {
    res.status(204).send({ Message: "No projects exists!" });
  } else {
    res.status(200).send({
      message: "All projects for GDO!",
      payload: projects,
      gdoId: id,
    });
  }
});

// updating Team member details

const updateMember = expressAsyncHandler(async (req, res) => {
  // get data from request body
  const data = req.body;

  // get id from parameters
  let id = req.params.id;

  // update record in team table
  await ProjectTeamComposition.update(data, {
    where: {
      id: id,
    },
  });
  res.status(200).send({ Message: "Employee details updated!" });
});

// deleting team member from team
const deleteMember = expressAsyncHandler(async (req, res) => {
  // get employee id from parameters
  let id = req.params.id;
  let updateCount = await ProjectTeamComposition.destroy({
    where: {
      id: id,
    },
  });
  res.status(200).send({ Message: "Project member deleted!" });
});

// assigning employeee to team

const assignProjectToEmployee = expressAsyncHandler(async (req, res) => {
  const employee = req.body;
  await ProjectTeamComposition.create(employee);
  res.status(201).send({ Message: "Project assigned to employee!" });
});

// detailed view of a project
const detailedProjectView = expressAsyncHandler(async (req, res) => {
  // particular project id
  const id = req.params.projectId;
  // particular gdo id
  const gdoId = req.params.gdoId;

  // get project data including other table data
  let detailView = await Project.findOne({
    where: {
      projectId: id,
      gdoId: gdoId,
      status: true,
    },
    include: [
      {
        association: Project.ProjectConcern,
      },
      {
        association: Project.ProjectTeamComposition,
      },
      {
        association: Project.ProjectUpdate,
      },
    ],
  });

  /*
    get two previous 2 weeks updates for project   
*/

  let singleProject = await Project.findOne({
    where: {
      projectId: id,
      status: true,
    },
  });

  console.log("detail viewprint", detailView);
  // no project found
  if (detailView == null) {
    res.status(204).send({
      Message: "No project to display!",
    });
  } else {
    res.status(200).send({
      Message: "Project detailed view!",
      payload: detailView,
      singleProject: singleProject,
    });
  }
});

// creating project
const createProject = expressAsyncHandler(async (req, res) => {
  // inserting project into projects table;
  const project = req.body;
  let insert = await Project.create(project);
  res.status(201).send({ Message: "Project created!" });
});

// raise a project update
const raiseProjectUpdate = expressAsyncHandler(async (req, res) => {
  // get data from body
  // let id = req.params.id;
  let updates = req.body;

  // add data to project update table
  await ProjectUpdate.create(updates);

  // sending back response
  res.send({ Message: "Project updated posted!", payload: updates });
});

// update a project

const updateProject = expressAsyncHandler(async (req, res) => {
  // getting project id from parameters
  const projectId = req.params.id;

  // getting update count
  const updateCount = await Project.update(req.body, {
    where: {
      projectId: projectId,
    },
  });

  // sending back response
  if (updateCount > 0) {
    res.status(200).send({ Message: "Project updated!" });
  } else if (updateCount == 0) {
    res.status(200).send({ Message: "Project not modified!" });
  }
});

// DELETE PROJECT CONCERN

const deleteProjectConcern = expressAsyncHandler(async (req, res) => {
  // getting id
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

// exporting all the controller functions
module.exports = {
  makeResourceRequest,
  allProjectsUnderGdo,
  updateMember,
  deleteMember,
  assignProjectToEmployee,
  detailedProjectView,
  createProject,
  raiseProjectUpdate,
  updateProject,
  deleteProjectConcern,
};

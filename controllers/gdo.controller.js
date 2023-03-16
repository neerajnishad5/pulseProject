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
    },
  });

  // if projects array length is 0
  if (projects.length == 0) {
    res.status(204).send({ Message: "No projects exists!" });
  } else {
    res.status(200).send({
      message: "All projects for GDO!",
      payload: projects,
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
  await TeamComposition.update(data, {
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
  let updateCount = await TeamComposition.destroy({
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
    ],
  });

  /*

  // get two previous 2 weeks updates for project

  const today = new Date();
  const twoWeeksBack = date.setDate(date.getDate() - 14);

  const projectUpdatesForTwoWeeks = await detailView.getProjectUpdate({
    where: {
      date: {
        [Op.between]: [twoWeeksBack, today],
      },
    },
  });

  // get Project Fitness, Concerns Indicator, Team members (Billed Count) for the project

  // get project fitness indicator
  const projectFitness = detailView.dataValues.projectFitnessIndicator;

  //get all project concern
  let concernsCount = 0;
  detailView.dataValues.projectConcern.forEach((concern) => {
    if (concern.status == "pending") {
      concernsCount++;
    }
  });
*/
  // sending back response

  // no project found
  if (detailView.length == 0) {
    res.status(204).send({
      Message: "No project to display!",
    });
  } else {
    res
      .status(200)
      .send({ Message: "Project detailed view!", payload: detailView });
    /*
    res.status(200).send({
      Message: `Project detailed view for Project ID: ${id}!
      Fitness Indicator: ${projectFitness}
      Concerns: ${concernsCount}`,
      payload: detailView,
    });*/
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
};

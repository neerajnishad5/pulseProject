// importing sequelize from db
const sequelize = require("../db/db.config");

// importing datatypes
const { DataTypes } = require("sequelize");

const {Project} = require("../models/project.model")
// importing user model
const { User } = require("../models/user.model");


// exporting project concern model
exports.ProjectConcern = sequelize.define(
  "projectConcern",
  {
    projectId: {
      type: DataTypes.INTEGER,
      references: {
        model: Project,
        key: "projectId"
      }
    },
    concernDescription: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    raisedBy: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    raisedOn: {
      type: DataTypes.DATEONLY,
      // allowNull: false,
    },
    severityOfConcern: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    raisedInternally: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    concernMitigationDate: {
      type: DataTypes.DATEONLY,
    },
    projectManager: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "userId",
      },
    },
  },
  {
    timestamps: false,
    updatedAt: false,
    createdAt: false,
    freezeTableName: true,
  }
);

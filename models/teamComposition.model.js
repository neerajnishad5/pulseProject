// importing sequelize
const sequelize = require("../db/db.config");
const { DataTypes } = require("sequelize");

// importing employee model
const { Employee } = require("./employee.model");

// exporting project team composition
exports.ProjectTeamComposition = sequelize.define(
  "projectTeamComposition",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: Employee,
        key: "id",
      },
    },
    projectId: {
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    resourceName: {
      type: DataTypes.STRING,
    },
    roleInProject: {
      type: DataTypes.STRING,
    },
    startDate: {
      type: DataTypes.DATEONLY,
    },
    endDate: {
      type: DataTypes.DATEONLY,
    },
    status: {
      type: DataTypes.BOOLEAN,
    },
    billingStatus: {
      type: DataTypes.STRING,
    },
    exposedToCustomer: {
      type: DataTypes.BOOLEAN,
    },
    allocationType: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
    updatedAt: false,
    createdAt: false,
    freezeTableName: true,
  }
);

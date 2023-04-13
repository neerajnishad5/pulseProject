// importing sequelize from db
const sequelize = require("../db/db.config");

// importing datatypes
const { DataTypes } = require("sequelize");

// importing project model
const { Project } = require("../models/project.model");

// importing user model
const { User } = require("../models/user.model");

sequelize.sync();  

// exporting project update model
exports.ProjectUpdate = sequelize.define(
  "projectUpdate",
  {
    projectId: {
      type: DataTypes.INTEGER,
      references: {
        model: Project,
        key: "projectId",
      },
    },
    updateDate: {
      type: DataTypes.DATEONLY,
      // allowNull: false,
    },
    projectStatus: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    scheduleStatus: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    resourcingStatus: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    qualityStatus: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    waitingForClient: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
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
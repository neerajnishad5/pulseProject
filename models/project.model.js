// importing sequelize from db
const sequelize = require("../db/db.config");

// importing datatypes
const { DataTypes } = require("sequelize");
const { User } = require("../models/user.model");

// exporting project table
exports.Project = sequelize.define(
  "projects",
  {
    projectId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    projectName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    clientName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    clientAccountManager: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    projectStatus: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    projectStartDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    projectEndDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    projectFitnessIndicator: {
      type: DataTypes.CHAR,
      allowNull: false,
    },
    projectDomain: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    projectType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gdoId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "userId",
      },
    },
    // hrManager: {
    //   type: DataTypes.INTEGER,
    //   references: {
    //     model: User,
    //     key: "userId",
    //   },
    // },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
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

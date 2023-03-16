// importing sequelize from db
const sequelize = require("../db/db.config");

// importing datatypes
const { DataTypes } = require("sequelize");
// importing User table
const { User } = require("../models/user.model");

// exporting resource request model
exports.ResourceRequest = sequelize.define(
  "resourceRequest",
  {
    gdoId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "userId",
      },
    },
    projectId: {
      type: DataTypes.INTEGER,
    },
    requestdescription: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    updatedAt: false,
    createdAt: false,
    freezeTableName: true,
  }
);

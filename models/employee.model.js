// importing sequelize from db
const sequelize = require("../db/db.config");

// importing datatypes
const { DataTypes } = require("sequelize");

// exporting employee table
exports.Employee = sequelize.define(
  "employees",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
        contains: {
          args: "@westagilelab.com",
          msg: "Domain must be westagilelab.com only!",
        },
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, 
  {
    freezeTableName: true,
    updatedAt: false,
    createdAt: false,
    timestamps: false,
  }
);

// importing sequelize
const sequelize = require("../db/db.config");

// importing datatypes
const { DataTypes } = require("sequelize");

// exporting user model
exports.User = sequelize.define(
  "users",
  {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        contains: {
          args: "@westagilelab.com",
          msg: "Domain must be westagilelab.com only!",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
    updatedAt: false,
    createdAt: false,
    timestamps: false,
  }
);

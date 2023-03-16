// importing Sequelize
const { Sequelize } = require("sequelize");

// importing dotenv file and calling config function on it
require("dotenv").config();

// create instance
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.PASSWORD,
  {
    host: "localhost",
    dialect: "mysql",
  }
);

// exporting sequelzie object instance
module.exports = sequelize;
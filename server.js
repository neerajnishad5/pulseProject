// importing express
const express = require("express");

// creating express application
const app = express();

// importing body parser
app.use(express.json());

// importing sequelize
const sequelize = require("./db/db.config");

// dotenv
require("dotenv").config();

// specifying the port
const port = process.env.PORT || 4000;

// checking database connection with sequelize
sequelize
  .authenticate()
  .then(() => console.log("DB connection success!"))
  .catch((err) => console.log(err));

// creating tables : calling sync method
sequelize.sync();

// importing verification token for project manager
const { verifyProjectManger } = require("./middlewares/verifyProjectManager");

// importing verification token for GDO
const { verifyGdo } = require("./middlewares/verifyGdo");

// importing verification token for special user
const { verifySpecialUser } = require("./middlewares/verifySpecialUser");

// importing verification token for super admin
const { verifySuperAdmin } = require("./middlewares/verifySuperAdmin");

// using middlewares for specific roles

// user api middleware
const user = require("./routes/user.route");
app.use("/user", user);

// gdo api middleware
const gdo = require("./routes/gdo.route");
app.use("/gdo", verifyGdo, gdo);

// superAdmin api middleware
const superAdmin = require("./routes/superAdmin.route");
app.use("/super-admin", verifySuperAdmin, superAdmin);

// special user api middleware
const specialUser = require("./routes/specialUser.route");
app.use("/special-user", verifySpecialUser, specialUser);

// project manager api middleware
const projectManager = require("./routes/projectManager.route");
// app.use("/project-manager", verifyProjectManger, projectManager);

// invalid path
app.use("*", (req, res) => {
  res.send({ message: "Invalid path" });
});
// error handling middleware
app.use((err, req, res, next) => {
  res.send({ message: err.message });
});

// listening to port
app.listen(port, () => console.log(`Server running @ ${port}!`));


module.exports = app;
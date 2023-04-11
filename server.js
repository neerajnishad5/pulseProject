// importing express
const express = require("express");

// creating express application
const app = express();

// importing cors
const cors = require("cors");
app.use(cors());

// CONNECTING BUILD OF REACT APP WITH NODEJS WEB SERVER
// const path = require("path");
// app.use(express.static(path.join(__dirname, "../build")));

// importing body parser
app.use(express.json());

// importing sequelize
const sequelize = require("./db/db.config");

// importing helmet module to secure app by setting various HTTP headers
const helmet = require("helmet");
app.use(helmet());

// dotenv
require("dotenv").config();

// specifying the port
const port = process.env.PORT || 5000;

// checking database connection with sequelize
sequelize
  .authenticate()
  .then(() => console.log("DB connection success!"))
  .catch((err) => console.log(err));

// creating tables : calling sync method
sequelize.sync({});

// importing verification token for project manager
const { verifyProjectManger } = require("./middlewares/verifyProjectManager");

// importing verification token for GDO
const { verifyGdo } = require("./middlewares/verifyGdo");

// importing verification token for special user
const { verifyAdmin } = require("./middlewares/verifyAdmin");

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
const admin = require("./routes/admin.route");
app.use("/admin", verifyAdmin, admin);

// project manager api middleware
const projectManager = require("./routes/projectManager.route");
app.use("/project-manager", verifyProjectManger, projectManager);

// PAGE REFRESH HANDLER -> when refresh the page it shouldn't show cannot get or wrong path middleware rather show index.htm file in build
// app.use((req, res) => {
//   res.sendFile(path.join(__dirname, "../build/index.html"));
// });

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

// export app
module.exports = app;

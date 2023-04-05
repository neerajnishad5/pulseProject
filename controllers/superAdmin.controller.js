// importing expressAsyncHandler
const expressAsyncHandler = require("express-async-handler");

// import user controller
const { User } = require("../models/user.model");

// assigning role to some employee
const assignRole = expressAsyncHandler(async (req, res) => {
  let { userId, role } = req.body;

  console.log(userId);

  // finding a user if it exist in db
  const find = await User.findOne({
    where: {
      userId: userId,
 
    },
  });

  // if not found user not exist
  if (find == null) {
    res.status(204).send({ Message: "User doesn't exist!" });
  } else {
    // if found update the user role
    const rowsUpdated = await User.update(
      {
        role: role,
      },
      {
        where: {
          userId: userId,
        },
      }
    );
    find.role = role;
    console.log("find log", find);

    // send back response
    res.status(200).send({ Message: `User ${userId} assigned ${role}!`, payload: find });
  }
});

// get all registered users
const getAllUsers = expressAsyncHandler(async (req, res) => {
  // all users details
  let data = await User.findAll({
    attributes: {
      exclude: ["password"],
    },
  });

  console.log("print data",data);

  // send back response
  res.status(200).send({ Message: "All users!", payload: data });
});

// get all unassinged users
const unassignedUsers = expressAsyncHandler(async (req, res) => {
  // find all users with role == null
  const users = await User.findAll({
    where: {
      role: null,
    },
    attributes: {
      exclude: ["password", "role"],
    },
  });

  // sending back response
  res.status(200).send({ Message: "All users with unassigned roles!", payload: users });
});

// exporting controllers
module.exports = {
  assignRole,
  getAllUsers,
  unassignedUsers,
};

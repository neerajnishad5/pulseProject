// importing jwt
const jwt = require("jsonwebtoken");
// importing dotenv
require("dotenv").config();

// importing expressAsyncHandler
const expressAsyncHandler = require("express-async-handler");

// named export special user token
exports.verifyAdmin = expressAsyncHandler(async (req, res, next) => {
  //token verification logic get bearer token from header req
  let bearerToken = req.headers.authorization;
  //check existence of bearer token
  console.log(bearerToken);
  if (bearerToken == undefined) {
    res.status(401).send({ Message: "Unauthorized access" });
  }
  //if bearer token exists, get token from bearer token
  else {
    //["bearer",token]
    let token = bearerToken.split(" ")[1]; 

    try {
      let decodedToken = jwt.verify(token, process.env.SECRET_KEY);

      // verify role and call next if verified successfully
      if (decodedToken.userRole == "admin") {
        next();
      } else {
        // sending back unauthorize access
        res.status(401).send({ Message: "Unauthorized access!" });
      }
    } catch (err) {
      // sending back session expired response i.e 440
      res.status(440).send({ Message: "Session Expired! Login again!" });
    }
  }
});

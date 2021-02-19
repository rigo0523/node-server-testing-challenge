const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

//server
const server = express();

//import routers
const welcomeRouter = require("../welcome/welcome-router");
const usersRouter = require("../users/users-router");

//Global middleware
server.use(helmet());
server.use(cors());
server.use(express.json());

//Server endpoints --------->
server.use("/", welcomeRouter);
server.use("/api/users", usersRouter);

//global middleware for .catch on all endpoints
server.use((err, req, res, next) => {
  // console.log("err--->", err);
  res.status(500).json({ Error: "500 Error, what happened?" });
});

module.exports = server;

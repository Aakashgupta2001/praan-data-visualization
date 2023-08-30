const express = require("express");
const path = require("path");
const { useErrorHandler } = require("../middlewares/errorHandler");

const wind = require("./wind");
const auth = require("./auth");

module.exports.default = (app) => {
  //getDirectory function for hosting frontend
  function getDir() {
    if (process.pkg) {
      return path.resolve(process.execPath + "/..");
    } else {
      return path.join(require.main ? require.main.path : process.cwd());
    }
  }

  //enable JSON objects in express
  app.use(express.json());

  //api path for wind
  app.use("/api/v1/wind", wind);
  app.use("/api/v1/auth", auth);

  //use static paths for frontend
  app.use(express.static(getDir() + "/build"));
  app.use(express.static("public"));

  //frontend Path
  app.get("/dashboard", (req, res, next) => {
    res.sendFile(getDir() + "/build/index.html");
  });

  //error handler extended middleware
  app.use(useErrorHandler);
};

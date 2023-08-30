const userModel = require("../model/User");
const service = require("../service/service");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { responseHandler } = require("../middlewares/response-handler");
const errorHandler = require("../middlewares/errorHandler");

exports.signup = async (req, res, next) => {
  try {
    const existingUser = await service.findOne(userModel, {
      email: req.body.email,
    });
    if (existingUser) {
      throw new errorHandler.BadRequest("User already exist");
    }

    let body = req.body;
    if (!body.password || body.password.length < 5) {
      return res.status(406).send("Password required");
    }

    body.email = body.email.toLowerCase();
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(body.password, salt);
    body.password = hashPassword;

    const user = await service.create(userModel, body);
    let returnBody = {
      email: user.email,
    };
    return responseHandler(returnBody, res);
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    if (!req.body || !req.body.email || !req.body.password) {
      throw new errorHandler.BadRequest("error bad request");
    }
    const filter = {
      email: req.body.email.toLowerCase(),
    };
    const user = await service.findOne(userModel, filter);
    if (!user) {
      throw new errorHandler.BadRequest("User does not exist");
    }

    const result = await bcrypt.compare(req.body.password, user.password);
    if (!result) {
      throw new errorHandler.BadRequest("Incorrect Password");
    }
    const token = await jwt.sign({ email: user.email, _id: user._id }, process.env.SECRET_KEY);
    responseHandler(
      {
        token: token,
        email: user.email,
      },
      res,
      "Signin Successful"
    );
  } catch (err) {
    next(err);
  }
};

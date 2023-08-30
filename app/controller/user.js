const userModel = require("../model/User");
const service = require("../service/service");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { responseHandler } = require("../middlewares/response-handler");
const errorHandler = require("../middlewares/errorHandler");

exports.signup = async (req, res, next) => {
  try {
    //checking for existing user
    const existingUser = await service.findOne(userModel, {
      email: req.body.email,
    });
    if (existingUser) {
      throw new errorHandler.BadRequest("User already exist");
    }

    let body = req.body;
    //throwing error if not a valid password
    if (!body.password || body.password.length < 5) {
      return res.status(406).send("Password required");
    }

    body.email = body.email.toLowerCase();
    //encrypting password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(body.password, salt);
    body.password = hashPassword;

    //creating user using encrypted password
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

    //checking if user exists
    const user = await service.findOne(userModel, filter);
    if (!user) {
      throw new errorHandler.BadRequest("User does not exist");
    }

    //comparing the given password with encrypted password
    const result = await bcrypt.compare(req.body.password, user.password);
    if (!result) {
      throw new errorHandler.BadRequest("Incorrect Password");
    }
    //generating jwt token
    const token = await jwt.sign({ email: user.email, _id: user._id }, process.env.SECRET_KEY);

    // returning response using response handler for uniform response throuout the app
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

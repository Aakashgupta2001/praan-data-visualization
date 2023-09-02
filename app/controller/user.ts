import { Request, Response, NextFunction } from "express";
import userModel from "../model/User";
import * as service from "../service/service";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { responseHandler } from "../middlewares/response-handler";
import * as errorHandler from "../middlewares/errorHandler";

import { IUser } from "../types/user.model";

interface SignupRequestBody {
  email: string;
  password: string;
}

export const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body: SignupRequestBody = req.body;

    // Checking for existing user
    const existingUser = await service.findOne(userModel, {
      email: body.email,
    });

    if (existingUser) {
      throw new errorHandler.BadRequest("User already exist");
    }

    // Throwing error if not a valid password
    if (!body.password || body.password.length < 5) {
      res.status(406).send("Password required");
      return;
    }

    body.email = body.email.toLowerCase();

    // Encrypting password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(body.password, salt);
    body.password = hashPassword;

    // Creating user using encrypted password
    const user: IUser = await service.create(userModel, body);
    const returnBody = {
      email: user.email,
    };

    return responseHandler(returnBody, res);
  } catch (err) {
    next(err);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
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
    const token = await jwt.sign({ email: user.email, _id: user._id }, process.env.SECRET_KEY as string);

    // returning response using response handler for uniform response throughout the app
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

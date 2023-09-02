import jwt from "jsonwebtoken";
import * as error from "../middlewares/errorHandler";
import { Request, Response, NextFunction } from "express";

export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  // get the token from the header if present
  let token: string | undefined = req.headers.authorization as string | undefined;

  // if no token found, throw error (without going to the next middleware)
  if (!token) {
    throw new error.Unauthorized("Unauthorized");
  }

  try {
    if (token.includes("Bearer")) {
      token = token.substr(7);
    }

    // if can verify the token, set req.user and pass to next middleware
    const decoded = jwt.verify(token, process.env.SECRET_KEY as string);
    req.user = decoded;
    next();
  } catch (err: any) {
    throw new error.Unauthorized(err);
  }
};

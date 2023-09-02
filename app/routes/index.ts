import express, { Express, Request, Response, NextFunction } from "express";
import path from "path";

// Assuming these middlewares/modules have default exports. Adjust if they have named exports.
import { useErrorHandler } from "../middlewares/errorHandler";
import wind from "./wind";
import auth from "./auth";

export default (app: Express) => {
  // getDirectory function for hosting frontend
  function getDir(): string {
    if (process.pkg) {
      return path.resolve(`${process.execPath}/..`);
    } else {
      return path.join(require.main ? require.main.path : process.cwd());
    }
  }

  // Enable JSON objects in express
  app.use(express.json());

  // API paths
  app.use("/api/v1/wind", wind);
  app.use("/api/v1/auth", auth);

  // Use static paths for frontend
  app.use(express.static(`${getDir()}/build`));
  app.use(express.static("public"));

  // Frontend Path
  app.get("/*", (req: Request, res: Response, next: NextFunction) => {
    res.sendFile(`${getDir()}/build/index.html`);
  });

  // Error handler extended middleware
  app.use(useErrorHandler);
};

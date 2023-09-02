import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

// Configuring env variables
dotenv.config();

const app: Express = express();

// Allowing cross URL requests
app.use(cors());

// Routes (assuming you have default export for your routes in "./app/routes")
// If it's not a default export, adjust accordingly (e.g., `import * as routes from "./app/routes"`)
import routes from "./routes";
routes(app);

// Connecting to MongoDB
mongoose
  .connect(process.env.MONGO_URL as string)
  .then(() => {
    console.log("Connected To Mongo");
  })
  .catch((error: any) => {
    console.log(error);
  });

// Starting server
const port: string | number = process.env.PORT || 3001;
app.listen(port, (err?: any) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server is running on port ${port}`);
  }
});

const express = require("express");
const app = express();
const cors = require("cors");
const mongo = require("mongoose");

//configuring env variables
require("dotenv").config();

//allowing cross url requests
app.use(cors());

//routes
require("./app/routes").default(app);

//connecting to mongodb
mongo
  .connect(process.env.MONGO_URL)
  .catch((error) => console.log(error))
  .then(() => {
    console.log("Connected To Mongo");
  });

//starting server
const port = process.env.PORT || 3001;
app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else console.log("Server is running on port", port);
});

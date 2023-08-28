const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs");
app.use(cors());

//routes
require("./routes").default(app);

//starting server
const port = process.env.PORT || 3001;

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else console.log("Server is running on port", port);
});

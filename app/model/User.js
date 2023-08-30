const mongoose = require("mongoose");
Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: "email is required",
    unique: true,
  },
  password: {
    type: String,
    required: "Password Is Required",
  },
  active: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("users", userSchema);

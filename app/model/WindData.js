const mongoose = require("mongoose");

const WindDataSchema = new mongoose.Schema({
  device: {
    type: String,
    required: true,
  },
  t: {
    type: Date,
    required: true,
  },
  w: {
    type: Number,
    required: true,
  },
  h: {
    type: String,
    required: true,
  },
  p1: {
    type: Number,
    required: true,
  },
  p25: {
    type: Number,
    required: true,
  },
  p10: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("WindData", WindDataSchema);

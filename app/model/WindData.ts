import mongoose, { Document, Schema } from "mongoose";

interface IWindData extends Document {
  device: string;
  t: Date;
  w: number;
  h: string;
  p1: number;
  p25: number;
  p10: number;
}

const WindDataSchema: Schema = new Schema({
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

const WindDataModel = mongoose.model<IWindData>("WindData", WindDataSchema);

export default WindDataModel;

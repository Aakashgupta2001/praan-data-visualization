import { model, Schema } from "mongoose";
import { IUser } from "../types/user.model";

const userSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
});

export const UserModel = model<IUser>("users", userSchema);
export default UserModel;

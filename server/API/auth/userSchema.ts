import Joi from "joi";
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    requierd: [true, "user must have email"],
  },
  password: String,
  firstName: String,
  lastName: String,
  role: {
    type: String,
    enum: ["ADMIN", "COSTUMER"],
    default: "COSTUMER",
  },
});

const UserModel = mongoose.model("users", UserSchema);

export default UserModel;

export const UserJoi = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  rePassword: Joi.ref("password"),
});

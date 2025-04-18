import { Schema, model } from "mongoose";
import { userValidators } from "../models/User.validator";

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate: {
        validator: userValidators.username.validator,
        message: userValidators.username.message,
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: userValidators.email.validator,
        message: userValidators.email.message,
      },
    },
    phone: {
      type: String,
      required:false,
      
      
    },
    password: {
      type: String,
      required:false,
      validate: {
        validator: userValidators.password.validator,
        message: userValidators.password.message,
      },
    },
    profilePic: {
      type: String,
      required: false,
      trim: true,
    },
    otpVerified: {
      type: Boolean,
      default: false,
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
    isBlock: {
      type: Boolean,
      default: false,
    },
    eWallet: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default model("User", UserSchema);

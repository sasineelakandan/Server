import { Schema, model } from "mongoose";
import { doctorValidators } from "../models/Doctor.validator";

const DoctorSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: doctorValidators.name.validator,
        message: doctorValidators.name.message,
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: doctorValidators.email.validator,
        message: doctorValidators.email.message,
      },
    },
    password: {
      type: String,
      required: true,
      validate: {
        validator: doctorValidators.password.validator,
        message: doctorValidators.password.message,
      },
    },
    specialization: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: doctorValidators.specialization.validator,
        message: doctorValidators.specialization.message,
      },
    },
    experience: {
      type: Number,
      required: true,
      validate: {
        validator: doctorValidators.experience.validator,
        message: doctorValidators.experience.message,
      },
    },
    profilePic: {
      type: String,
      required: false,
      validate: {
        validator: doctorValidators.profilePic.validator,
        message: doctorValidators.profilePic.message,
      },
    },
    licensePic: {
      type: String,
      required: false,
      validate: {
        validator: doctorValidators.licensePic.validator,
        message: doctorValidators.licensePic.message,
      },
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: doctorValidators.phone.validator,
        message: "Please enter a valid phone number.",
      },
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isOtpVerified: { 
      type: Boolean,
      default: false,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default model("Doctor", DoctorSchema);

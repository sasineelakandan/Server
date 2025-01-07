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
    fees: {
      type: Number,
      required: false,
      validate: {
        validator: doctorValidators.fees?.validator,
        message: doctorValidators.fees.message,
      },
    },
    hospitalName: {
      type: String,
      required: false,
      default: "",
    },
    licenseNumber: {
      type: String,
      required: false,
      default: "",
    },
    street: {
      type: String,
      required: false,
      default: "",
    },
    city: {
      type: String,
      required: false,
      default: "",
    },
    state: {
      type: String,
      required: false,
      default: "",
    },
    licenseImage: {
      type: String,
      required: false,
      default: "",
    },
    location: {
      address: { type: String, required: true },
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true },
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

export default model("Doctor", DoctorSchema);

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
      default: false, // Default set to false
    },
    isOtpVerified: {
      type: Boolean,
      default: false, // Default set to false
    },
    isBlocked: {
      type: Boolean,
      default: false, // Default set to false
    },
    isDeleted: {
      type: Boolean,
      default: false, // Default set to false
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
      required: false, // Optional field
      default: "", // Default empty string if not provided
    },
    licenseNumber: {
      type: String,
      required: false, // Optional field
      default: "", // Default empty string if not provided
    },
    street: {
      type: String,
      required: false, // Optional field
      default: "", // Default empty string if not provided
    },
    city: {
      type: String,
      required: false, // Optional field
      default: "", // Default empty string if not provided
    },
    state: {
      type: String,
      required: false, // Optional field
      default: "", // Default empty string if not provided
    },
    licenseImage: {
      type: String,
      required: false, // Optional field
      default: "", // Default empty string if not provided
    },
    location: {
      address: { type: String, required: true },
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true },
    },
  },
  {
    timestamps: true,
  }
);


export default model("Doctor", DoctorSchema);

import { Schema, model } from "mongoose";
import { validateOtpCode } from "../models/otpValidator";  

const OtpSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    otpCode: {
      type: String,
      required: true,
      validate: {
        validator: validateOtpCode,
        message: "OTP must be a 6-digit number.",
      },
    },
    expiresAt: {
      type: Date,
      required: true,
      index: { expires: 60 },
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default model("Otp", OtpSchema);

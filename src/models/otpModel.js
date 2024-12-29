"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var Otp_validator_1 = require("../models/Otp.validator");
var OtpSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    otpCode: {
        type: String,
        required: true,
        validate: {
            validator: Otp_validator_1.validateOtpCode,
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
}, {
    timestamps: true,
});
exports.default = (0, mongoose_1.model)("Otp", OtpSchema);

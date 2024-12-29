"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Doctor_validator_1 = require("../models/Doctor.validator");
const DoctorSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: Doctor_validator_1.doctorValidators.name.validator,
            message: Doctor_validator_1.doctorValidators.name.message,
        },
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: Doctor_validator_1.doctorValidators.email.validator,
            message: Doctor_validator_1.doctorValidators.email.message,
        },
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: Doctor_validator_1.doctorValidators.password.validator,
            message: Doctor_validator_1.doctorValidators.password.message,
        },
    },
    specialization: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: Doctor_validator_1.doctorValidators.specialization.validator,
            message: Doctor_validator_1.doctorValidators.specialization.message,
        },
    },
    experience: {
        type: Number,
        required: true,
        validate: {
            validator: Doctor_validator_1.doctorValidators.experience.validator,
            message: Doctor_validator_1.doctorValidators.experience.message,
        },
    },
    profilePic: {
        type: String,
        required: false,
        validate: {
            validator: Doctor_validator_1.doctorValidators.profilePic.validator,
            message: Doctor_validator_1.doctorValidators.profilePic.message,
        },
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: Doctor_validator_1.doctorValidators.phone.validator,
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
            validator: (_a = Doctor_validator_1.doctorValidators.fees) === null || _a === void 0 ? void 0 : _a.validator,
            message: Doctor_validator_1.doctorValidators.fees.message,
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
}, {
    timestamps: true,
});
exports.default = (0, mongoose_1.model)("Doctor", DoctorSchema);

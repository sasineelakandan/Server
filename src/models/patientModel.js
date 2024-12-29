"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
// Patient Schema
var patientSchema = new mongoose_1.default.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    doctorId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Doctor",
        required: true,
    },
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    slotId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "DoctorSlot",
        required: true,
    },
    reason: {
        type: String,
        required: true,
    },
    terms: {
        type: Boolean,
        required: true,
    },
    age: {
        type: Number,
        required: true,
        min: 0, // Minimum age validation
        max: 120, // Maximum age validation
    },
    gender: {
        type: String,
        required: true,
        enum: ["male", "female", "other"], // Restrict to specific values
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
var Patient = mongoose_1.default.model("Patient", patientSchema);
exports.default = Patient;

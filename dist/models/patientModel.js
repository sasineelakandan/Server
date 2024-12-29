import mongoose from "mongoose";
// Patient Schema
const patientSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor",
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    slotId: {
        type: mongoose.Schema.Types.ObjectId,
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
const Patient = mongoose.model("Patient", patientSchema);
export default Patient;

"use strict";
// models/appointment.js
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var appointmentSchema = new mongoose_1.default.Schema({
    slotId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: 'DoctorSlot',
    },
    doctorId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: 'Doctor',
    },
    patientId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: 'Patient',
    },
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    paymentId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Payment",
        required: true,
    },
    status: {
        type: String,
        enum: ["scheduled", "rescheduled", "canceled", 'completed'],
        default: "scheduled",
    },
});
var Appointment = mongoose_1.default.model("Appointment", appointmentSchema);
exports.default = Appointment;

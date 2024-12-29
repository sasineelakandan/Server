"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const paymentSchema = new mongoose_1.default.Schema({
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
    paymentStatus: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending',
    },
    amount: {
        type: Number,
        required: false,
    },
    transactionDate: {
        type: Date,
        default: Date.now,
    },
    transactionId: {
        type: String,
        required: false,
    }
});
const Payment = mongoose_1.default.model('Payment', paymentSchema);
exports.default = Payment;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// Define the schema
const reviewSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId, // Reference to the User collection
        ref: 'User',
        required: true,
    },
    doctorId: {
        type: mongoose_1.default.Schema.Types.ObjectId, // Reference to the Doctor collection
        ref: 'Doctor',
        required: true,
    },
    appointmentId: {
        type: mongoose_1.default.Schema.Types.ObjectId, // Reference to the Appointment collection
        ref: 'Appointment',
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1, // Minimum rating
        max: 5, // Maximum rating
    },
    reviewText: {
        type: String,
        required: true,
        trim: true, // Removes leading/trailing whitespace
    },
    createdAt: {
        type: Date,
        default: Date.now, // Automatically sets the date
    },
});
// Create the model
const Review = mongoose_1.default.model('Review', reviewSchema);
// Export the model
exports.default = Review;

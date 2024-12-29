import mongoose from 'mongoose';
// Define the schema
const reviewSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to the User collection
        ref: 'User',
        required: true,
    },
    doctorId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to the Doctor collection
        ref: 'Doctor',
        required: true,
    },
    appointmentId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to the Appointment collection
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
const Review = mongoose.model('Review', reviewSchema);
// Export the model
export default Review;

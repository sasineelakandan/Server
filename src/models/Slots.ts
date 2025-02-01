import mongoose from 'mongoose';

// Define the schema
const slotSchema = new mongoose.Schema({
  doctorId: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the Doctor collection
    ref: 'Doctor',
    required: true,
  },
  day: {
    type: String, // Day of the week, e.g., "Monday"
    required: true,
  },
  date: {
    type: Date, // Specific date for the slot, e.g., "2024-12-15"
    required: true,
  },
  fromTime: {
    type: String, // Start time of the slot, e.g., "10:00 AM"
    required: true,
  },
  toTime: {
    type: String, // End time of the slot, e.g., "11:00 AM"
    required: true,
  },
  slot: {
    type: String, // Time slot as a formatted string, e.g., "10:00 AM - 11:00 AM"
    required: true,
  },
  workingDays: {
    type: [String], // Array of working days, e.g., ["Monday", "Tuesday", "Wednesday"]
    default: [],
  },
  isBooked: {
    type: Boolean, // Indicates if the slot is booked
    default: false,
  },
  isUnavail: {
    type: Boolean, // Indicates if the slot is marked as unavailable
    default: false,
  },
  isExpired: {
    type: Boolean, // Indicates if the slot is expired
    default: false,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the User collection
    ref: 'User',
    default: null, // Optional, user who booked the slot
  },
  createdAt: {
    type: Date, // Automatically sets the creation date
    default: Date.now,
  },
});

// Create the model
const SlotModel = mongoose.model('Slot', slotSchema);

// Export the model
export default SlotModel;

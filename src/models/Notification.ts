import mongoose from 'mongoose';

// Define the schema
const notificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the User collection
    ref: 'User',
    required: true,
  },
  notitype: {
    type: String,
    required: true,
    enum: ['Info', 'Alert', 'Reminder', 'Update'], // Example notification types
  },
  message: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default:false
    
  },
  timestamp: {
    type: Date,
    default: Date.now, // Automatically sets the timestamp when notification is created
  },
 
  doctorId: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the Doctor collection, if related
    ref: 'Doctor',
    required: false,
  },
  relatedAppointmentId: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the Appointment collection, if related
    ref: 'Appointment',
    required: false,
  },
  roomId: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the Room collection (e.g., consultation room)
    ref: 'Room',
    required: false,
  },
}, {
  timestamps: true, // This will automatically create `createdAt` and `updatedAt` fields
});

// Create the model
const Notification = mongoose.model('Notification', notificationSchema);

// Export the model
export default Notification;

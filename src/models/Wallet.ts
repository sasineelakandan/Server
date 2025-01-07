import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  id: {
    type: String, // Corrected from lowercase 'string'
    required: true,
    unique: true, // Ensures the transaction ID is unique
  },
  date: {
    type: Date, // Changed to Date type for better date handling
    required: true,
  },
  type: {
    type: String,
    enum: ['Consultation Fee', 'Refund', 'Surgery Fee'], // Adjust as per your needs
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['Completed', 'Pending', 'Failed'], // Define valid statuses
    required: true,
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId, // References another document in the 'Doctor' collection
    ref: 'Doctor',
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId, // References another document in the 'User' collection
    ref: 'User',
    required: true,
  },
});

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;

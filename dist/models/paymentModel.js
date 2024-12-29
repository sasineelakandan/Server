import mongoose from 'mongoose';
const paymentSchema = new mongoose.Schema({
    slotId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'DoctorSlot',
    },
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Doctor',
    },
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
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
const Payment = mongoose.model('Payment', paymentSchema);
export default Payment;

import mongoose from "mongoose";

const prescriptionSchema = new mongoose.Schema({
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true, 
  },
  patientName: {
    type: String,
    required: true, 
  },
  medication: {
    type: String,
    required: true, 
  },
  dosage: {
    type: String,
    required: true, 
  },
  instructions: {
    type: String,
    required: true,
  },
  appointmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Appointment",  
    required: true,     
  },
  createdByDoctor: { 
    type: Boolean,
    default:true,
  },
  createdAt: {
    type: Date,
    default: Date.now, 
  },
});

const Prescription = mongoose.model("Prescription", prescriptionSchema);

export default Prescription;

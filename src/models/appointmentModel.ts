// models/appointment.js

import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
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
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
  
  status: {
    type: String,
    enum: ["scheduled", "rescheduled", "canceled"],
    default: "scheduled",
  },
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

export default Appointment;

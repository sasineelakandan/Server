import Doctor from "../models/doctorModel";
import Slot from "../models/slotsModel";
import Patients from "../models/patientModel";
import Payment from "../models/paymentModel";
import Appointment from "../models/appointmentModel";
export class BookingRepository {
    constructor() {
        this.getDoctors = async (userId) => {
            try {
                if (!userId) {
                    return null;
                }
                const doctors = await Doctor.find({ isBlocked: false, isDeleted: false, isOtpVerified: true, isVerified: true });
                if (!doctors) {
                    throw new Error(`Doctor with doctors not found.`);
                }
                return doctors;
            }
            catch (error) {
                console.error("Error in slot creation:", error);
                throw new Error(error.message);
            }
        };
        this.doctorDetails = async (doctorId) => {
            try {
                const doctor = await Doctor.findOne({ _id: doctorId });
                if (!doctor) {
                    throw new Error(`Doctor with doctor not found.`);
                }
                return {
                    _id: doctor._id.toString(),
                    name: doctor.name || "",
                    email: doctor.email || "",
                    phone: doctor.phone || "",
                    specialization: doctor.specialization || "",
                    licenseImage: doctor.licenseImage || "",
                    hospitalName: doctor.hospitalName || "",
                    fees: doctor.fees?.toString() || "",
                    licenseNumber: doctor.licenseNumber?.toString() || "",
                    profilePic: doctor.profilePic || "",
                    experience: doctor.experience.toString() || "",
                    isVerified: doctor.isVerified,
                    password: doctor.password,
                    location: doctor.location,
                    createdAt: doctor.createdAt,
                    updatedAt: doctor.updatedAt,
                };
            }
            catch (error) {
                console.error("Error in slot creation:", error);
                throw new Error(error.message);
            }
        };
        this.getSlots = async (doctorId, userId) => {
            try {
                const slots = await Slot.find({ doctorId: doctorId, status: 'confirmed' });
                if (!slots) {
                    throw new Error(`Doctor with doctor not found.`);
                }
                return slots;
            }
            catch (error) {
                console.error("Error in slot creation:", error);
                throw new Error(error.message);
            }
        };
        this.bookingSlots = async (userId, doctorId, selectedSlots) => {
            try {
                const existingSlot = await Slot.findOne({ _id: selectedSlots });
                if (existingSlot && existingSlot.status === 'confirmed') {
                    return {
                        status: existingSlot.status,
                        success: false,
                        message: 'This slot is already booked.',
                    };
                }
                const slots = await Slot.updateOne({ _id: selectedSlots, doctorId: doctorId }, { $set: { status: "booked", userId: userId } });
                if (!slots) {
                    throw new Error(`Doctor with slot not found.`);
                }
                return {
                    status: 'booked',
                    success: true,
                    message: 'slot status successfully change'
                };
            }
            catch (error) {
                console.error("Error in slot creation:", error);
                throw new Error(error.message);
            }
        };
        this.patientDetails = async (userId, patientDetails) => {
            try {
                const patientDetail = await Patients.create({
                    userId: userId,
                    ...patientDetails
                });
                if (!patientDetail) {
                    throw new Error(`Doctor with slot not found.`);
                }
                return {
                    _id: patientDetail?._id.toString(),
                    doctorId: patientDetail?.doctorId.toString(),
                    userId: patientDetail?.userId.toString(),
                    firstName: patientDetail?.firstName,
                    lastName: patientDetail?.lastName,
                    age: patientDetail?.age,
                    gender: patientDetail?.gender,
                    reason: patientDetail?.reason,
                    slotId: patientDetail?.slotId.toString(),
                };
            }
            catch (error) {
                console.error("Error in slot creation:", error);
                throw new Error(error.message);
            }
        };
        this.paymentDetails = async (userId, PaymentData) => {
            try {
                const { slotId, doctorId, txnid, amount, patientId } = PaymentData;
                const paymentDetail = await Payment.create({
                    userId: userId,
                    slotId: slotId,
                    doctorId: doctorId,
                    transactionId: txnid,
                    amount: amount,
                    patientId: patientId
                });
                if (!paymentDetail) {
                    throw new Error(`Doctor with slot not found.`);
                }
                return {
                    status: 'pending',
                    success: true,
                    message: 'slot status successfully change'
                };
            }
            catch (error) {
                console.error("Error in slot creation:", error);
                throw new Error(error.message);
            }
        };
        this.paymentSuccess = async (userId, txnid) => {
            try {
                const payment = await Payment.findOne({ transactionId: txnid });
                const slotUpdate = await Slot.updateOne({ _id: payment?.slotId }, { status: 'confirmed', booked: true });
                const paymentDetail = await Payment.updateOne({ transactionId: txnid }, { $set: { paymentStatus: 'completed' } });
                const appointment = await Appointment.create({
                    userId: userId,
                    slotId: payment?.slotId,
                    doctorId: payment?.doctorId,
                    patientId: payment?.patientId,
                    paymentId: payment?._id,
                });
                if (!paymentDetail) {
                    throw new Error(`Doctor with slot not found.`);
                }
                return {
                    status: 'completed',
                    success: true,
                    message: 'slot status successfully change'
                };
            }
            catch (error) {
                console.error("Error in slot creation:", error);
                throw new Error(error.message);
            }
        };
    }
}

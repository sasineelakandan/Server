import { error } from "console";
export class BookingService {
    bookingRepository;
    constructor(bookingRepository) {
        this.bookingRepository = bookingRepository;
    }
    getDoctors = async (userId) => {
        try {
            if (!userId) {
                return null;
            }
            const doctors = await this.bookingRepository.getDoctors(userId);
            if (!doctors) {
                return null;
            }
            return doctors;
        }
        catch (error) {
            console.log("Error in userLogin", error.message);
            throw new Error(error.message);
        }
    };
    doctorDetails = async (doctorId) => {
        try {
            const doctor = await this.bookingRepository.doctorDetails(doctorId);
            if (!doctor) {
                throw error('doctor not found');
            }
            return { ...doctor };
        }
        catch (error) {
            console.log("Error in doctor details", error.message);
            throw new Error(error.message);
        }
    };
    getSlots = async (doctorId, userId) => {
        try {
            const slots = await this.bookingRepository.getSlots(doctorId, userId);
            if (!slots) {
                throw error('doctor not found');
            }
            return slots;
        }
        catch (error) {
            console.log("Error in doctor slots", error.message);
            throw new Error(error.message);
        }
    };
    bookingSlots = async (userId, doctorId, selectedSlots) => {
        try {
            const slots = await this.bookingRepository.bookingSlots(userId, doctorId, selectedSlots);
            if (!slots) {
                throw error('response is failed');
            }
            return slots;
        }
        catch (error) {
            console.log("Error in doctor slots", error.message);
            throw new Error(error.message);
        }
    };
    patientDetails = async (userId, patientDetails) => {
        try {
            const slots = await this.bookingRepository.patientDetails(userId, patientDetails);
            if (!slots) {
                throw error('response is failed');
            }
            return slots;
        }
        catch (error) {
            console.log("Error in doctor slots", error.message);
            throw new Error(error.message);
        }
    };
    paymentDetails = async (userId, PaymentData) => {
        try {
            const payment = await this.bookingRepository.paymentDetails(userId, PaymentData);
            if (!payment) {
                throw error('response is failed');
            }
            return payment;
        }
        catch (error) {
            console.log("Error in doctor slots", error.message);
            throw new Error(error.message);
        }
    };
    paymentSuccess = async (userId, txnid) => {
        try {
            const payment = await this.bookingRepository.paymentSuccess(userId, txnid);
            if (!payment) {
                throw error('response is failed');
            }
            return payment;
        }
        catch (error) {
            console.log("Error in doctor slots", error.message);
            throw new Error(error.message);
        }
    };
}

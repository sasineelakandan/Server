import { error } from "console";
export class BookingService {
    constructor(bookingRepository) {
        this.getDoctors = async (userId) => {
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
        this.doctorDetails = async (doctorId) => {
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
        this.getSlots = async (doctorId, userId) => {
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
        this.bookingSlots = async (userId, doctorId, selectedSlots) => {
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
        this.patientDetails = async (userId, patientDetails) => {
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
        this.paymentDetails = async (userId, PaymentData) => {
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
        this.paymentSuccess = async (userId, txnid) => {
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
        this.bookingRepository = bookingRepository;
    }
}

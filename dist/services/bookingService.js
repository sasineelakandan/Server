"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingService = void 0;
const console_1 = require("console");
class BookingService {
    constructor(bookingRepository) {
        this.getDoctors = (userId) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!userId) {
                    return null;
                }
                const doctors = yield this.bookingRepository.getDoctors(userId);
                if (!doctors) {
                    return null;
                }
                return doctors;
            }
            catch (error) {
                console.log("Error in userLogin", error.message);
                throw new Error(error.message);
            }
        });
        this.doctorDetails = (doctorId) => __awaiter(this, void 0, void 0, function* () {
            try {
                const doctor = yield this.bookingRepository.doctorDetails(doctorId);
                if (!doctor) {
                    throw (0, console_1.error)('doctor not found');
                }
                return Object.assign({}, doctor);
            }
            catch (error) {
                console.log("Error in doctor details", error.message);
                throw new Error(error.message);
            }
        });
        this.getSlots = (doctorId, userId) => __awaiter(this, void 0, void 0, function* () {
            try {
                const slots = yield this.bookingRepository.getSlots(doctorId, userId);
                if (!slots) {
                    throw (0, console_1.error)('doctor not found');
                }
                return slots;
            }
            catch (error) {
                console.log("Error in doctor slots", error.message);
                throw new Error(error.message);
            }
        });
        this.bookingSlots = (userId, doctorId, selectedSlots) => __awaiter(this, void 0, void 0, function* () {
            try {
                const slots = yield this.bookingRepository.bookingSlots(userId, doctorId, selectedSlots);
                if (!slots) {
                    throw (0, console_1.error)('response is failed');
                }
                return slots;
            }
            catch (error) {
                console.log("Error in doctor slots", error.message);
                throw new Error(error.message);
            }
        });
        this.patientDetails = (userId, patientDetails) => __awaiter(this, void 0, void 0, function* () {
            try {
                const slots = yield this.bookingRepository.patientDetails(userId, patientDetails);
                if (!slots) {
                    throw (0, console_1.error)('response is failed');
                }
                return slots;
            }
            catch (error) {
                console.log("Error in doctor slots", error.message);
                throw new Error(error.message);
            }
        });
        this.paymentDetails = (userId, PaymentData) => __awaiter(this, void 0, void 0, function* () {
            try {
                const payment = yield this.bookingRepository.paymentDetails(userId, PaymentData);
                if (!payment) {
                    throw (0, console_1.error)('response is failed');
                }
                return payment;
            }
            catch (error) {
                console.log("Error in doctor slots", error.message);
                throw new Error(error.message);
            }
        });
        this.paymentSuccess = (userId, txnid) => __awaiter(this, void 0, void 0, function* () {
            try {
                const payment = yield this.bookingRepository.paymentSuccess(userId, txnid);
                if (!payment) {
                    throw (0, console_1.error)('response is failed');
                }
                return payment;
            }
            catch (error) {
                console.log("Error in doctor slots", error.message);
                throw new Error(error.message);
            }
        });
        this.bookingRepository = bookingRepository;
    }
}
exports.BookingService = BookingService;

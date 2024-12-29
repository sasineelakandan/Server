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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingRepository = void 0;
const doctorModel_1 = __importDefault(require("../models/doctorModel"));
const slotsModel_1 = __importDefault(require("../models/slotsModel"));
const patientModel_1 = __importDefault(require("../models/patientModel"));
const paymentModel_1 = __importDefault(require("../models/paymentModel"));
const appointmentModel_1 = __importDefault(require("../models/appointmentModel"));
class BookingRepository {
    constructor() {
        this.getDoctors = (userId) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!userId) {
                    return null;
                }
                const doctors = yield doctorModel_1.default.find({ isBlocked: false, isDeleted: false, isOtpVerified: true, isVerified: true });
                if (!doctors) {
                    throw new Error(`Doctor with doctors not found.`);
                }
                return doctors;
            }
            catch (error) {
                console.error("Error in slot creation:", error);
                throw new Error(error.message);
            }
        });
        this.doctorDetails = (doctorId) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                const doctor = yield doctorModel_1.default.findOne({ _id: doctorId });
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
                    fees: ((_a = doctor.fees) === null || _a === void 0 ? void 0 : _a.toString()) || "",
                    licenseNumber: ((_b = doctor.licenseNumber) === null || _b === void 0 ? void 0 : _b.toString()) || "",
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
        });
        this.getSlots = (doctorId, userId) => __awaiter(this, void 0, void 0, function* () {
            try {
                const slots = yield slotsModel_1.default.find({ doctorId: doctorId, status: 'confirmed' });
                if (!slots) {
                    throw new Error(`Doctor with doctor not found.`);
                }
                return slots;
            }
            catch (error) {
                console.error("Error in slot creation:", error);
                throw new Error(error.message);
            }
        });
        this.bookingSlots = (userId, doctorId, selectedSlots) => __awaiter(this, void 0, void 0, function* () {
            try {
                const existingSlot = yield slotsModel_1.default.findOne({ _id: selectedSlots });
                if (existingSlot && existingSlot.status === 'confirmed') {
                    return {
                        status: existingSlot.status,
                        success: false,
                        message: 'This slot is already booked.',
                    };
                }
                const slots = yield slotsModel_1.default.updateOne({ _id: selectedSlots, doctorId: doctorId }, { $set: { status: "booked", userId: userId } });
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
        });
        this.patientDetails = (userId, patientDetails) => __awaiter(this, void 0, void 0, function* () {
            try {
                const patientDetail = yield patientModel_1.default.create(Object.assign({ userId: userId }, patientDetails));
                if (!patientDetail) {
                    throw new Error(`Doctor with slot not found.`);
                }
                return {
                    _id: patientDetail === null || patientDetail === void 0 ? void 0 : patientDetail._id.toString(),
                    doctorId: patientDetail === null || patientDetail === void 0 ? void 0 : patientDetail.doctorId.toString(),
                    userId: patientDetail === null || patientDetail === void 0 ? void 0 : patientDetail.userId.toString(),
                    firstName: patientDetail === null || patientDetail === void 0 ? void 0 : patientDetail.firstName,
                    lastName: patientDetail === null || patientDetail === void 0 ? void 0 : patientDetail.lastName,
                    age: patientDetail === null || patientDetail === void 0 ? void 0 : patientDetail.age,
                    gender: patientDetail === null || patientDetail === void 0 ? void 0 : patientDetail.gender,
                    reason: patientDetail === null || patientDetail === void 0 ? void 0 : patientDetail.reason,
                    slotId: patientDetail === null || patientDetail === void 0 ? void 0 : patientDetail.slotId.toString(),
                };
            }
            catch (error) {
                console.error("Error in slot creation:", error);
                throw new Error(error.message);
            }
        });
        this.paymentDetails = (userId, PaymentData) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { slotId, doctorId, txnid, amount, patientId } = PaymentData;
                const paymentDetail = yield paymentModel_1.default.create({
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
        });
        this.paymentSuccess = (userId, txnid) => __awaiter(this, void 0, void 0, function* () {
            try {
                const payment = yield paymentModel_1.default.findOne({ transactionId: txnid });
                const slotUpdate = yield slotsModel_1.default.updateOne({ _id: payment === null || payment === void 0 ? void 0 : payment.slotId }, { status: 'confirmed', booked: true });
                const paymentDetail = yield paymentModel_1.default.updateOne({ transactionId: txnid }, { $set: { paymentStatus: 'completed' } });
                const appointment = yield appointmentModel_1.default.create({
                    userId: userId,
                    slotId: payment === null || payment === void 0 ? void 0 : payment.slotId,
                    doctorId: payment === null || payment === void 0 ? void 0 : payment.doctorId,
                    patientId: payment === null || payment === void 0 ? void 0 : payment.patientId,
                    paymentId: payment === null || payment === void 0 ? void 0 : payment._id,
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
        });
    }
}
exports.BookingRepository = BookingRepository;

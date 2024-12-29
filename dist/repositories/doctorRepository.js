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
exports.DoctorRepository = void 0;
const doctorModel_1 = __importDefault(require("../models/doctorModel"));
const otpModel_1 = __importDefault(require("../models/otpModel"));
const slotsModel_1 = __importDefault(require("../models/slotsModel"));
const appointmentModel_1 = __importDefault(require("../models/appointmentModel"));
const chatRoomModel_1 = __importDefault(require("../models/chatRoomModel"));
const messageModel_1 = __importDefault(require("../models/messageModel"));
const index_1 = require("../../src/index");
class DoctorRepository {
    constructor() {
        this.addDoctor = (doctorData) => __awaiter(this, void 0, void 0, function* () {
            try {
                const doctor = yield doctorModel_1.default.create(Object.assign({}, doctorData));
                return {
                    _id: doctor._id.toString(),
                    name: doctor.name,
                    email: doctor.email,
                    phone: doctor.phone,
                    password: doctor.password,
                    specialization: doctor.specialization,
                    experience: doctor.experience,
                    createdAt: doctor.createdAt,
                    updatedAt: doctor.updatedAt,
                };
            }
            catch (error) {
                console.error("Error adding user:", error);
                if (error.code === 11000) {
                    const field = Object.keys(error.keyValue)[0];
                    const value = error.keyValue[field];
                    error.message = `${field} '${value}' already exists.`;
                }
                throw new Error(error.message);
            }
        });
        this.verifyOtp = (doctorOtpData) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = doctorOtpData;
                const otp = yield otpModel_1.default.findOne({ userId: userId });
                if (!otp) {
                    throw new Error("OTP not found or expired.");
                }
                if (otp.expiresAt < new Date()) {
                    throw new Error("OTP has expired.");
                }
                return {
                    _id: otp._id.toString(),
                    doctorId: otp.userId.toString(),
                    otp: otp.otpCode.toString(),
                    expiryDate: otp.expiresAt
                };
            }
            catch (error) {
                console.error("Error find Otp:", error);
                if (error.code === 11000) {
                    const field = Object.keys(error.keyValue)[0];
                    const value = error.keyValue[field];
                    error.message = `${field} '${value}' already exists.`;
                }
                throw new Error(error.message);
            }
        });
        this.updateDoctorOtp = (userId) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield doctorModel_1.default.updateOne({ _id: userId }, { $set: { isOtpVerified: true } });
                return { message: 'doctorOtp updated' };
            }
            catch (error) {
                console.error("Error find update Doctor:", error);
                if (error.code === 11000) {
                    const field = Object.keys(error.keyValue)[0];
                    const value = error.keyValue[field];
                    error.message = `${field} '${value}' already exists.`;
                }
                throw new Error(error.message);
            }
        });
        this.getDoctorByEmail = (email) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield doctorModel_1.default.findOne({ email, isOtpVerified: true });
                if (!user) {
                    throw new Error("User not found .");
                }
                if (user.isBlocked) {
                    throw new Error("You are blocked.");
                }
                return {
                    _id: user._id.toString(),
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    specialization: user.specialization,
                    experience: user.experience,
                    password: user.password,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt,
                };
            }
            catch (error) {
                console.error("Error find loginUser:", error);
                if (error.code === 11000) {
                    const field = Object.keys(error.keyValue)[0];
                    const value = error.keyValue[field];
                    error.message = `${field} '${value}' already exists.`;
                }
                throw new Error(error.message);
            }
        });
        this.getDoctorProfile = (userId) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                const doctor = yield doctorModel_1.default.findOne({ _id: userId });
                if (!doctor) {
                    throw new Error(`Doctor with ID ${userId} not found.`);
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
                console.error("Error finding doctor:", error);
                throw new Error("Unable to fetch doctor profile. Please try again later.");
            }
        });
        this.updateDoctorProfile = (formData, userId) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                const { licenseImage, licenseImage1, hospitalName, fees, licenseNumber } = formData;
                const updateDoctor = yield doctorModel_1.default.updateOne({ _id: userId }, { $set: {
                        licenseImage: licenseImage,
                        profilePic: licenseImage1,
                        hospitalName: hospitalName,
                        fees: fees,
                        licenseNumber: licenseNumber
                    } });
                const doctor = yield doctorModel_1.default.findOne({ _id: userId });
                if (!doctor) {
                    throw new Error(`Doctor with ID ${userId} not found.`);
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
                console.error("Error finding doctor:", error);
                throw new Error("Unable to fetch doctor profile. Please try again later.");
            }
        });
        this.changeProfile = (userId, formData) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                const { phone, name, hospitalName, fees, experience } = formData;
                const updateDoctor = yield doctorModel_1.default.updateOne({ _id: userId }, { $set: {
                        name: name,
                        phone: phone,
                        hospitalName: hospitalName,
                        fees: fees,
                        experience: experience
                    } });
                const doctor = yield doctorModel_1.default.findOne({ _id: userId });
                if (!doctor) {
                    throw new Error(`Doctor with ID ${userId} not found.`);
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
                console.error("Error finding doctor:", error);
                throw new Error("Unable to fetch doctor profile. Please try again later.");
            }
        });
        this.changePassword = (userId, hashedPassword, oldPassword) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                const doctor = yield doctorModel_1.default.findOne({ _id: userId });
                if (!doctor) {
                    throw new Error(`Doctor with ID ${userId} not found.`);
                }
                const userUpdate = yield doctorModel_1.default.updateOne({ _id: userId }, { $set: { password: hashedPassword } });
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
                    location: doctor === null || doctor === void 0 ? void 0 : doctor.location,
                    createdAt: doctor.createdAt,
                    updatedAt: doctor.updatedAt,
                };
            }
            catch (error) {
                console.error("Error find loginUser:", error);
                throw new Error(error.message);
            }
        });
        this.getAppointments = (doctorId) => __awaiter(this, void 0, void 0, function* () {
            try {
                const appointments = yield appointmentModel_1.default.find({ doctorId: doctorId }).sort({ _id: -1 })
                    .populate('slotId')
                    .populate('doctorId')
                    .populate('patientId')
                    .populate('paymentId')
                    .populate('userId');
                if (!appointments) {
                    throw new Error(`Doctor with ID ${doctorId} not found.`);
                }
                return appointments;
            }
            catch (error) {
                console.error("Error in slot creation:", error);
                throw new Error(error.message);
            }
        });
        this.resheduleAppointment = (doctorId, payloadData) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { date, startTime, endTime, appointmentId } = payloadData;
                const appointments = yield appointmentModel_1.default.findOne({ doctorId: doctorId, _id: appointmentId });
                const slotUpdate = yield slotsModel_1.default.updateOne({ _id: appointments === null || appointments === void 0 ? void 0 : appointments.slotId }, { $set: { date: date, startTime: startTime, endTime: endTime } });
                const updateAppointment = yield appointmentModel_1.default.updateOne({ _id: appointmentId }, { $set: { status: 'rescheduled' } });
                if (!appointments) {
                    throw new Error(`Doctor with ID ${doctorId} not found.`);
                }
                return {
                    status: 'success',
                    message: 'Slot assigned successfully',
                };
            }
            catch (error) {
                console.error("Error in slot creation:", error);
                throw new Error(error.message);
            }
        });
        this.completeAppointment = (doctorId, appointmentId) => __awaiter(this, void 0, void 0, function* () {
            try {
                const updateAppointment = yield appointmentModel_1.default.updateOne({ _id: appointmentId }, { $set: { status: 'completed' } });
                if (!doctorId) {
                    throw new Error(`Doctor with ID ${doctorId} not found.`);
                }
                return {
                    status: 'success',
                    message: 'Slot assigned successfully',
                };
            }
            catch (error) {
                console.error("Error in slot creation:", error);
                throw new Error(error.message);
            }
        });
        this.cancelAppointment = (doctorId, appointmentId) => __awaiter(this, void 0, void 0, function* () {
            try {
                const updateAppointment = yield appointmentModel_1.default.updateOne({ _id: appointmentId }, { $set: { status: 'canceled' } });
                if (!doctorId) {
                    throw new Error(`Doctor with ID ${doctorId} not found.`);
                }
                return {
                    status: 'success',
                    message: 'Slot assigned successfully',
                };
            }
            catch (error) {
                console.error("Error in slot creation:", error);
                throw new Error(error.message);
            }
        });
        this.updateProfilepic = (doctorId, profilePic) => __awaiter(this, void 0, void 0, function* () {
            try {
                const updateProfilePic = yield doctorModel_1.default.updateOne({ _id: doctorId }, { $set: { profilePic: profilePic } });
                if (!doctorId) {
                    throw new Error(`Doctor with ID ${doctorId} not found.`);
                }
                return {
                    status: 'success',
                    message: 'Slot assigned successfully',
                };
            }
            catch (error) {
                console.error("Error in slot creation:", error);
                throw new Error(error.message);
            }
        });
        this.chatwithUser = (doctorId, appointmentId) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!doctorId) {
                    throw new Error(`User with ID ${doctorId} not found.`);
                }
                if (!appointmentId) {
                    throw new Error(`Appointment with ID ${appointmentId} not found.`);
                }
                const chatter = yield appointmentModel_1.default.findOne({ _id: appointmentId, doctorId: doctorId });
                const existingRoom = yield chatRoomModel_1.default.findOne({ patient: chatter === null || chatter === void 0 ? void 0 : chatter.userId, doctor: doctorId });
                if (existingRoom) {
                    return {
                        status: existingRoom === null || existingRoom === void 0 ? void 0 : existingRoom._id.toString(),
                        message: "Chat room already exists.",
                    };
                }
                const newChatRoom = new chatRoomModel_1.default({
                    patient: chatter === null || chatter === void 0 ? void 0 : chatter.userId,
                    doctor: doctorId,
                });
                const savedRoom = yield newChatRoom.save();
                return {
                    status: savedRoom === null || savedRoom === void 0 ? void 0 : savedRoom._id.toString(),
                    message: "Chat room created successfully",
                };
            }
            catch (error) {
                console.error("Error in chatroom:", error);
                throw new Error(error.message);
            }
        });
        this.sendMessage = (roomId, message) => __awaiter(this, void 0, void 0, function* () {
            try {
                // Validate inputs
                if (!roomId) {
                    throw new Error("Room ID is required.");
                }
                if (!message) {
                    throw new Error("Message content is required.");
                }
                // Find the chat room
                const chatter = yield chatRoomModel_1.default.findOne({ _id: roomId });
                if (!chatter) {
                    throw new Error(`Chat room with ID ${roomId} not found.`);
                }
                yield chatRoomModel_1.default.updateOne({ _id: roomId }, { $set: { lastMessage: message === null || message === void 0 ? void 0 : message.content } });
                const updatedRoom = yield chatRoomModel_1.default.findOne({ _id: roomId });
                console.log('Updated Chat Room:', updatedRoom);
                const createMsg = yield messageModel_1.default.create({
                    sender: chatter.patient,
                    receiver: chatter.doctor,
                    roomId,
                    content: message === null || message === void 0 ? void 0 : message.content,
                });
                index_1.io.to(roomId).emit("message", { createMsg });
                return {
                    status: "success",
                    message: "Message sent successfully.",
                };
            }
            catch (error) {
                console.error("Error in sendMessage doctor:", error);
                throw new Error(error.message);
            }
        });
        this.getMessage = (roomId) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!roomId) {
                    throw new Error(`User with ID ${roomId} not found.`);
                }
                const chatRoomUp = yield messageModel_1.default.updateMany({ roomId: roomId }, { $set: { isRead: true } });
                const message = yield messageModel_1.default.find({ roomId: roomId });
                return message;
            }
            catch (error) {
                console.error("Error in chatroom:", error);
                throw new Error(error.message);
            }
        });
        this.getChatMembers = (doctorId) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!doctorId) {
                    throw new Error(`User with ID ${doctorId} not found.`);
                }
                const message = yield chatRoomModel_1.default.find({ doctor: doctorId }).populate('patient');
                return message;
            }
            catch (error) {
                console.error("Error in chatroom:", error);
                throw new Error(error.message);
            }
        });
        this.forgotPasswordOtp = (email) => __awaiter(this, void 0, void 0, function* () {
            try {
                const doctor = yield doctorModel_1.default.findOne({ email: email });
                if (!email) {
                    throw new Error(`Doctor with ID ${email} not found.`);
                }
                return {
                    status: (doctor === null || doctor === void 0 ? void 0 : doctor._id.toString()) || '',
                    message: 'Slot assigned successfully',
                };
            }
            catch (error) {
                console.error("Error in slot creation:", error);
                throw new Error(error.message);
            }
        });
        this.forgotPassword = (userId) => __awaiter(this, void 0, void 0, function* () {
            try {
                const otp = yield otpModel_1.default.findOne({ userId: userId });
                if (!otp) {
                    throw new Error("OTP not found or expired.");
                }
                if (otp.expiresAt < new Date()) {
                    throw new Error("OTP has expired.");
                }
                return {
                    status: otp.otpCode,
                    message: "Message sent successfully.",
                };
            }
            catch (error) {
                console.error("Error find Otp:", error);
                if (error.code === 11000) {
                    const field = Object.keys(error.keyValue)[0];
                    const value = error.keyValue[field];
                    error.message = `${field} '${value}' already exists.`;
                }
                throw new Error(error.message);
            }
        });
        this.updateDoctorPassword = (userId, password) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield doctorModel_1.default.updateOne({ _id: userId }, { $set: { password } });
                return {
                    status: "success",
                    message: "Message sent successfully.",
                };
            }
            catch (error) {
                console.error("Error find update Doctor:", error);
                if (error.code === 11000) {
                    const field = Object.keys(error.keyValue)[0];
                    const value = error.keyValue[field];
                    error.message = `${field} '${value}' already exists.`;
                }
                throw new Error(error.message);
            }
        });
    }
}
exports.DoctorRepository = DoctorRepository;

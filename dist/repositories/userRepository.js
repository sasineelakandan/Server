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
exports.UserRepository = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const otpModel_1 = __importDefault(require("../models/otpModel"));
const appointmentModel_1 = __importDefault(require("../models/appointmentModel"));
const chatRoomModel_1 = __importDefault(require("../models/chatRoomModel"));
const messageModel_1 = __importDefault(require("../models/messageModel"));
const slotsModel_1 = __importDefault(require("../models/slotsModel"));
const reviewModel_1 = __importDefault(require("../models/reviewModel"));
const index_1 = require("../../src/index");
class UserRepository {
    constructor() {
        this.addUser = (userData) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield userModel_1.default.create(Object.assign({}, userData));
                return {
                    _id: user._id.toString(),
                    username: user.username,
                    email: user.email,
                    phone: user.phone || '',
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt,
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
        this.verifyOtp = (otpData) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = otpData;
                const otp = yield otpModel_1.default.findOne({ userId: userId });
                if (!otp) {
                    throw new Error("OTP not found or expired.");
                }
                if (otp.expiresAt < new Date()) {
                    throw new Error("OTP has expired.");
                }
                return {
                    _id: otp._id.toString(),
                    userId: otp.userId.toString(),
                    otp: otp.otpCode.toString(),
                    expiryDate: otp.expiresAt
                };
            }
            catch (error) {
                console.error("Error find Otp:", error);
                throw new Error(error.message);
            }
        });
        this.getUserByEmail = (email) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield userModel_1.default.findOne({ email, otpVerified: true });
                if (!user) {
                    throw new Error("User not found or expired.");
                }
                if (user.isBlock) {
                    console.log('hai');
                    throw new Error("You are Blocked!.");
                }
                return {
                    _id: user._id.toString(),
                    username: user.username,
                    email: user.email,
                    phone: user.phone || '',
                    password: user.password || '',
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt,
                };
            }
            catch (error) {
                console.error("Error find loginUser:", error);
                throw new Error(error.message);
            }
        });
        this.updateUserOtp = (userId) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield userModel_1.default.updateOne({ _id: userId }, { $set: { otpVerified: true } });
                return { message: 'userOtp updated' };
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
        this.userProfile = (userId) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield userModel_1.default.findOne({ _id: userId });
                if (!user) {
                    throw new Error(`Doctor with ID ${userId} not found.`);
                }
                return {
                    _id: user._id.toString(),
                    username: user.username,
                    email: user.email,
                    phone: user.phone || '',
                    profilePic: user.profilePic || '',
                    password: user.password || '',
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt,
                };
            }
            catch (error) {
                console.error("Error find loginUser:", error);
                throw new Error(error.message);
            }
        });
        this.changeProfile = (userId, name, phone) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userUpdate = yield userModel_1.default.updateOne({ _id: userId }, { $set: { username: name, phone: phone } });
                const user = yield userModel_1.default.findOne({ _id: userId });
                if (!user) {
                    throw new Error(`Doctor with ID ${userId} not found.`);
                }
                return {
                    _id: user._id.toString(),
                    username: user.username,
                    email: user.email,
                    phone: user.phone || '',
                    profilePic: user.profilePic || '',
                    password: user.password || '',
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt,
                };
            }
            catch (error) {
                console.error("Error find loginUser:", error);
                throw new Error(error.message);
            }
        });
        this.changePassword = (userId, hashedPassword, oldPassword) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield userModel_1.default.findOne({ _id: userId });
                if (!user) {
                    throw new Error(`Doctor with ID ${userId} not found.`);
                }
                const userUpdate = yield userModel_1.default.updateOne({ _id: userId }, { $set: { password: hashedPassword } });
                return {
                    _id: user._id.toString(),
                    username: user.username,
                    email: user.email,
                    phone: user.phone || '',
                    profilePic: user.profilePic || '',
                    password: (user === null || user === void 0 ? void 0 : user.password) || '',
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt,
                };
            }
            catch (error) {
                console.error("Error find loginUser:", error);
                throw new Error(error.message);
            }
        });
        this.getAppointments = (userId) => __awaiter(this, void 0, void 0, function* () {
            try {
                const appointments = yield appointmentModel_1.default.find({ userId: userId }).sort({ _id: -1 })
                    .populate('slotId')
                    .populate('doctorId')
                    .populate('patientId')
                    .populate('userId');
                console.log(appointments);
                if (!appointments) {
                    throw new Error(`Doctor with ID ${userId} not found.`);
                }
                return appointments;
            }
            catch (error) {
                console.error("Error in slot creation:", error);
                throw new Error(error.message);
            }
        });
        this.cancelAppointments = (userId, appointmentId) => __awaiter(this, void 0, void 0, function* () {
            try {
                const appointment = yield appointmentModel_1.default.findOne({ _id: appointmentId });
                const slot = yield slotsModel_1.default.updateOne({ _id: appointment === null || appointment === void 0 ? void 0 : appointment.slotId }, { status: 'booked', booked: false });
                const updateAppointment = yield appointmentModel_1.default.updateOne({ _id: appointmentId }, { $set: { status: 'canceled' } });
                if (!userId) {
                    throw new Error(`Doctor with ID ${userId} not found.`);
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
        this.updateProfilePic = (userId, profilePic) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!userId) {
                    throw new Error(`user with ID ${userId} not found.`);
                }
                const updateProfilePic = yield userModel_1.default.updateOne({ _id: userId }, { $set: { profilePic: profilePic } });
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
        this.chatwithDoctor = (userId, appointmentId) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!userId) {
                    throw new Error(`User with ID ${userId} not found.`);
                }
                if (!appointmentId) {
                    throw new Error(`Appointment with ID ${appointmentId} not found.`);
                }
                const chatter = yield appointmentModel_1.default.findOne({ _id: appointmentId, userId: userId });
                const existingRoom = yield chatRoomModel_1.default.findOne({ patient: userId, doctor: chatter === null || chatter === void 0 ? void 0 : chatter.doctorId });
                if (existingRoom) {
                    return {
                        status: existingRoom === null || existingRoom === void 0 ? void 0 : existingRoom._id.toString(),
                        message: "Chat room already exists.",
                    };
                }
                const newChatRoom = new chatRoomModel_1.default({
                    patient: userId,
                    doctor: chatter === null || chatter === void 0 ? void 0 : chatter.doctorId,
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
                if (!roomId) {
                    throw new Error(`User with ID ${roomId} not found.`);
                }
                if (!message) {
                    throw new Error(`Appointment with ID ${message} not found.`);
                }
                const chatter = yield chatRoomModel_1.default.findOne({ _id: roomId });
                const updateChatter = yield chatRoomModel_1.default.updateOne({ _id: roomId }, { $set: { lastMessage: message === null || message === void 0 ? void 0 : message.content } });
                const createMsg = yield messageModel_1.default.create({ sender: chatter === null || chatter === void 0 ? void 0 : chatter.patient, receiver: chatter === null || chatter === void 0 ? void 0 : chatter.doctor, roomId, content: message === null || message === void 0 ? void 0 : message.content });
                index_1.io.to(roomId).emit("message", { createMsg });
                return {
                    status: 'sucess',
                    message: "Chat room created successfully",
                };
            }
            catch (error) {
                console.error("Error in chatroom:", error);
                throw new Error(error.message);
            }
        });
        this.getMessage = (roomId) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!roomId) {
                    throw new Error(`User with ID ${roomId} not found.`);
                }
                const chatRoomUp = yield chatRoomModel_1.default.updateOne({ _id: roomId }, { $set: { isReadUc: 0 } });
                const readmessage = yield messageModel_1.default.updateMany({ roomId: roomId }, { $set: { isRead: true } });
                const message = yield messageModel_1.default.find({ roomId: roomId });
                return message;
            }
            catch (error) {
                console.error("Error in chatroom:", error);
                throw new Error(error.message);
            }
        });
        this.getChatMembers = (userId) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!userId) {
                    throw new Error(`User with ID ${userId} not found.`);
                }
                const message = yield chatRoomModel_1.default.find({ patient: userId }).populate('doctor');
                return message;
            }
            catch (error) {
                console.error("Error in chatroom:", error);
                throw new Error(error.message);
            }
        });
        this.slotAsign = (userId, slotData) => __awaiter(this, void 0, void 0, function* () {
            try {
                const existingSlot = yield slotsModel_1.default.findOne({
                    doctorId: slotData.doctorId,
                    userId,
                    date: slotData.date,
                    startTime: slotData.startTime,
                    endTime: slotData.endTime,
                    booked: true,
                });
                if (existingSlot) {
                    throw new Error(`Slot already exists for this time range.`);
                }
                const data = yield slotsModel_1.default.create({
                    doctorId: slotData.doctorId,
                    userId,
                    date: slotData.date,
                    startTime: slotData.startTime,
                    endTime: slotData.endTime,
                    status: 'booked'
                });
                if (!data) {
                    throw new Error(`Doctor with ID ${userId} not found.`);
                }
                return {
                    _id: data._id.toString(),
                    date: data.date.toDateString(),
                    startTime: data.startTime,
                    doctorId: data.doctorId.toString(),
                    isBooked: data.booked,
                    endTime: data.endTime
                };
            }
            catch (error) {
                console.error("Error in slot creation:", error);
                throw new Error(error.message);
            }
        });
        this.getcompleteAppointment = (userId) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!userId) {
                    throw new Error(`User with ID ${userId} not found.`);
                }
                const appointments = yield appointmentModel_1.default.find({ userId: userId, status: 'completed' }).sort({ _id: -1 })
                    .populate('slotId')
                    .populate('doctorId')
                    .populate('patientId')
                    .populate('userId');
                return appointments;
            }
            catch (error) {
                console.error("Error in chatroom:", error);
                throw new Error(error.message);
            }
        });
        this.userReview = (userId, Review) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!userId) {
                    throw new Error(`User with ID ${userId} not found.`);
                }
                if (!Review) {
                    throw new Error(`Appointment with ID ${Review} not found.`);
                }
                const data = yield reviewModel_1.default.create(Object.assign({ userId }, Review));
                return {
                    reviewText: data === null || data === void 0 ? void 0 : data.reviewText,
                    rating: data === null || data === void 0 ? void 0 : data.rating,
                    createdAt: data === null || data === void 0 ? void 0 : data.createdAt.toString()
                };
            }
            catch (error) {
                console.error("Error in chatroom:", error);
                throw new Error(error.message);
            }
        });
        this.googleLogin = (GoogleUser) => __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield userModel_1.default.updateOne({ email: GoogleUser.email }, {
                    $set: {
                        username: GoogleUser.displayName,
                        phone: 'Not Provider',
                    },
                }, { upsert: true });
                const user = yield userModel_1.default.findOne({ email: GoogleUser.email });
                if (!user) {
                    throw new Error("User not found after upsert.");
                }
                return {
                    _id: user._id.toString(),
                    username: user.username,
                    email: user.email,
                    profilePic: (user === null || user === void 0 ? void 0 : user.profilePic) || ''
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
        this.getReview = (doctorId) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!doctorId) {
                    throw new Error(`User with ID ${doctorId} not found.`);
                }
                const reviewDatas = yield reviewModel_1.default.find({ doctorId: doctorId }).sort({ _id: -1 })
                    .populate('userId');
                return reviewDatas;
            }
            catch (error) {
                console.error("Error in chatroom:", error);
                throw new Error(error.message);
            }
        });
    }
}
exports.UserRepository = UserRepository;

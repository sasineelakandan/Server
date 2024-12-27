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
exports.UserService = void 0;
const encription_1 = require("../utils/encription");
const errors_1 = require("../utils/errors");
const generateJWT_1 = require("../utils/generateJWT");
class UserService {
    constructor(userRepository) {
        this.userSignup = (userData) => __awaiter(this, void 0, void 0, function* () {
            try {
                const encryptedPassword = (0, encription_1.encryptPassword)(userData.password);
                const user = yield this.userRepository.addUser(Object.assign(Object.assign({}, userData), { password: encryptedPassword }));
                const accessToken = (0, generateJWT_1.generateAccessToken)(user._id, "user");
                const refreshToken = (0, generateJWT_1.generateRefreshToken)(user._id, "user");
                return Object.assign(Object.assign({}, user), { accessToken, refreshToken });
            }
            catch (error) {
                console.log("Error in user service", error.message);
                throw new Error(error.message);
            }
        });
        this.verifyOtp = (otpData) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, otp } = otpData;
                const userotp = yield this.userRepository.verifyOtp({ userId });
                if (userotp.otp !== otp) {
                    throw new Error("Invalid OTP.");
                }
                if (userotp.otp == otp) {
                    yield this.userRepository.updateUserOtp(userId);
                }
                return Object.assign({}, userotp);
            }
            catch (error) {
                console.log("Error in verifyOtp", error.message);
                throw new Error(error.message);
            }
        });
        this.userLogin = (email, password) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userRepository.getUserByEmail(email);
                const isValidPassword = (0, encription_1.comparePassword)(password, user.password);
                if (!isValidPassword)
                    throw new errors_1.AppError("Invalid Credentials", 401);
                const accessToken = (0, generateJWT_1.generateAccessToken)(user._id, "user");
                const refreshToken = (0, generateJWT_1.generateRefreshToken)(user._id, "user");
                return {
                    _id: user._id,
                    username: user.username,
                    email: user.email,
                    phone: user.phone,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt,
                    accessToken,
                    refreshToken,
                };
            }
            catch (error) {
                console.log("Error in userLogin", error.message);
                throw new Error(error.message);
            }
        });
        this.userProfile = (userId) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userRepository.userProfile(userId);
                console.log(user);
                return {
                    _id: user._id,
                    username: user.username,
                    email: user.email,
                    phone: user.phone,
                    profilePic: user === null || user === void 0 ? void 0 : user.profilePic,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt,
                };
            }
            catch (error) {
                console.log("Error in userLogin", error.message);
                throw new Error(error.message);
            }
        });
        this.changeProfile = (userId, name, phone) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userRepository.changeProfile(userId, name, phone);
                return {
                    _id: user._id,
                    username: user.username,
                    email: user.email,
                    phone: user.phone,
                    profilePic: user.profilePic || '',
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt,
                };
            }
            catch (error) {
                console.log("Error in userLogin", error.message);
                throw new Error(error.message);
            }
        });
        this.changePassword = (userId, oldPassword, newPassword) => __awaiter(this, void 0, void 0, function* () {
            try {
                let user = yield this.userRepository.changePassword(userId, oldPassword, newPassword);
                const hashedPassword = yield (0, encription_1.encryptPassword)(newPassword);
                const isValidPassword = (0, encription_1.comparePassword)(oldPassword, user === null || user === void 0 ? void 0 : user.password);
                if (isValidPassword) {
                    user = yield this.userRepository.changePassword(userId, hashedPassword, oldPassword);
                }
                if (!isValidPassword)
                    throw new errors_1.AppError("Invalid Credentials", 401);
                return {
                    _id: user._id,
                    username: user.username,
                    email: user.email,
                    phone: user.phone,
                    profilePic: user === null || user === void 0 ? void 0 : user.profilePic,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt,
                };
            }
            catch (error) {
                console.log("Error in changepassword", error.message);
                throw new Error(error.message);
            }
        });
        this.getAppointments = (userId) => __awaiter(this, void 0, void 0, function* () {
            try {
                const appointments = yield this.userRepository.getAppointments(userId);
                return appointments;
            }
            catch (error) {
                console.log("Error in doctorProfile", error.message);
                throw new Error(error.message);
            }
        });
        this.cancelAppointments = (userId, appointmentId) => __awaiter(this, void 0, void 0, function* () {
            try {
                const appointments = yield this.userRepository.cancelAppointments(userId, appointmentId);
                return appointments;
            }
            catch (error) {
                console.log("Error in doctorProfile", error.message);
                throw new Error(error.message);
            }
        });
        this.updateProfilePic = (userId, profilePic) => __awaiter(this, void 0, void 0, function* () {
            try {
                const appointments = yield this.userRepository.updateProfilePic(userId, profilePic);
                return appointments;
            }
            catch (error) {
                console.log("Error in doctorProfile", error.message);
                throw new Error(error.message);
            }
        });
        this.chatwithDoctor = (userId, appointmentId) => __awaiter(this, void 0, void 0, function* () {
            try {
                const appointments = yield this.userRepository.chatwithDoctor(userId, appointmentId);
                return appointments;
            }
            catch (error) {
                console.log("Error in chat", error.message);
                throw new Error(error.message);
            }
        });
        this.sendMessage = (roomId, message) => __awaiter(this, void 0, void 0, function* () {
            try {
                const chatmessage = yield this.userRepository.sendMessage(roomId, message);
                return chatmessage;
            }
            catch (error) {
                console.log("Error in chat", error.message);
                throw new Error(error.message);
            }
        });
        this.getMessage = (roomId) => __awaiter(this, void 0, void 0, function* () {
            try {
                const chatmessage = yield this.userRepository.getMessage(roomId);
                return chatmessage;
            }
            catch (error) {
                console.log("Error in chat", error.message);
                throw new Error(error.message);
            }
        });
        this.getChatMembers = (userId) => __awaiter(this, void 0, void 0, function* () {
            try {
                const chatmessage = yield this.userRepository.getChatMembers(userId);
                return chatmessage;
            }
            catch (error) {
                console.log("Error in chat", error.message);
                throw new Error(error.message);
            }
        });
        this.slotAsign = (userId, slotData) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.userRepository.slotAsign(userId, slotData);
                return {
                    _id: data._id.toString(),
                    date: data.date,
                    startTime: data.startTime,
                    doctorId: data.doctorId,
                    isBooked: data.isBooked,
                    endTime: data.endTime
                };
            }
            catch (error) {
                console.log("Error in doctorProfile", error.message);
                throw new Error(error.message);
            }
        });
        this.getcompleteAppointment = (userId) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.userRepository.getcompleteAppointment(userId);
                console.log(data);
                return data;
            }
            catch (error) {
                console.log("Error in doctorProfile", error.message);
                throw new Error(error.message);
            }
        });
        this.userReview = (userId, Review) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.userRepository.userReview(userId, Review);
                return {
                    reviewText: data === null || data === void 0 ? void 0 : data.reviewText,
                    rating: data === null || data === void 0 ? void 0 : data.rating,
                    createdAt: data === null || data === void 0 ? void 0 : data.createdAt.toString()
                };
            }
            catch (error) {
                console.log("Error in doctorProfile", error.message);
                throw new Error(error.message);
            }
        });
        this.googleLogin = (GoogleUser) => __awaiter(this, void 0, void 0, function* () {
            try {
                function generateUniquePhoneNumber() {
                    const firstDigit = Math.floor(Math.random() * 4) + 6;
                    const restOfTheNumber = Math.floor(Math.random() * 900000000) + 100000000;
                    const phoneNumber = `${firstDigit}${restOfTheNumber}`;
                    return phoneNumber;
                }
                const uniquePhoneNumber = generateUniquePhoneNumber();
                const phone = uniquePhoneNumber.toString();
                const user = yield this.userRepository.googleLogin(Object.assign(Object.assign({}, GoogleUser), { phone: phone }));
                const accessToken = (0, generateJWT_1.generateAccessToken)(user._id, "user");
                const refreshToken = (0, generateJWT_1.generateRefreshToken)(user._id, "user");
                return Object.assign(Object.assign({}, user), { accessToken, refreshToken });
            }
            catch (error) {
                console.log("Error in user service", error.message);
                throw new Error(error.message);
            }
        });
        this.getReview = (doctorId) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.userRepository.getReview(doctorId);
                return data;
            }
            catch (error) {
                console.log("Error in doctorProfile", error.message);
                throw new Error(error.message);
            }
        });
        this.userRepository = userRepository;
    }
}
exports.UserService = UserService;

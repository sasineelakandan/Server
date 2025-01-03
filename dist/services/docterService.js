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
exports.DoctorService = void 0;
const encription_1 = require("../utils/encription");
const errors_1 = require("../utils/errors");
const generateJWT_1 = require("../utils/generateJWT");
class DoctorService {
    constructor(doctorRepository) {
        this.doctorSignup = (doctorData) => __awaiter(this, void 0, void 0, function* () {
            try {
                const encryptedPassword = (0, encription_1.encryptPassword)(doctorData.password);
                const doctor = yield this.doctorRepository.addDoctor(Object.assign(Object.assign({}, doctorData), { password: encryptedPassword }));
                const accessToken = (0, generateJWT_1.generateAccessToken)(doctor._id, "doctor");
                const refreshToken = (0, generateJWT_1.generateRefreshToken)(doctor._id, "doctor");
                return Object.assign(Object.assign({}, doctor), { accessToken, refreshToken });
            }
            catch (error) {
                console.log("Error in user service", error.message);
                throw new Error(error.message);
            }
        });
        this.verifyOtp = (otpData) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, otp } = otpData;
                const userotp = yield this.doctorRepository.verifyOtp({ userId });
                if (userotp.otp !== otp) {
                    throw new Error("Invalid OTP.");
                }
                if (userotp.otp == otp) {
                    yield this.doctorRepository.updateDoctorOtp(userId);
                }
                return Object.assign({}, userotp);
            }
            catch (error) {
                console.log("Error in verifyOtp", error.message);
                throw new Error(error.message);
            }
        });
        this.doctorLogin = (email, password) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.doctorRepository.getDoctorByEmail(email);
                const isValidPassword = (0, encription_1.comparePassword)(password, user.password);
                if (!isValidPassword)
                    throw new errors_1.AppError("Invalid Credentials", 401);
                const accessToken = (0, generateJWT_1.generateAccessToken)(user._id, "doctor");
                const refreshToken = (0, generateJWT_1.generateRefreshToken)(user._id, "doctor");
                return {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    specialization: user.specialization,
                    experience: user.experience,
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
        this.doctorProfile = (userId) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.doctorRepository.getDoctorProfile(userId);
                return Object.assign({}, user);
            }
            catch (error) {
                console.log("Error in doctorProfile", error.message);
                throw new Error(error.message);
            }
        });
        this.updateProfile = (formData, userId) => __awaiter(this, void 0, void 0, function* () {
            try {
                const doctor = yield this.doctorRepository.updateDoctorProfile(formData, userId);
                return Object.assign({}, doctor);
            }
            catch (error) {
                console.log("Error in doctorProfile", error.message);
                throw new Error(error.message);
            }
        });
        this.changeProfile = (userId, formData) => __awaiter(this, void 0, void 0, function* () {
            try {
                const doctor = yield this.doctorRepository.changeProfile(userId, formData);
                return Object.assign({}, doctor);
            }
            catch (error) {
                console.log("Error in doctorProfile", error.message);
                throw new Error(error.message);
            }
        });
        this.changePassword = (userId, oldPassword, newPassword) => __awaiter(this, void 0, void 0, function* () {
            try {
                let doctor = yield this.doctorRepository.changePassword(userId, oldPassword, newPassword);
                const hashedPassword = yield (0, encription_1.encryptPassword)(newPassword);
                const isValidPassword = (0, encription_1.comparePassword)(oldPassword, doctor === null || doctor === void 0 ? void 0 : doctor.password);
                if (isValidPassword) {
                    doctor = yield this.doctorRepository.changePassword(userId, hashedPassword, oldPassword);
                }
                if (!isValidPassword)
                    throw new errors_1.AppError("Invalid Credentials", 401);
                return Object.assign({}, doctor);
            }
            catch (error) {
                console.log("Error in changepassword", error.message);
                throw new Error(error.message);
            }
        });
        this.getAppointments = (doctorId) => __awaiter(this, void 0, void 0, function* () {
            try {
                const appointments = yield this.doctorRepository.getAppointments(doctorId);
                return appointments;
            }
            catch (error) {
                console.log("Error in doctorProfile", error.message);
                throw new Error(error.message);
            }
        });
        this.resheduleAppointment = (doctorId, payloadData) => __awaiter(this, void 0, void 0, function* () {
            try {
                const appointments = yield this.doctorRepository.resheduleAppointment(doctorId, payloadData);
                return appointments;
            }
            catch (error) {
                console.log("Error in doctorProfile", error.message);
                throw new Error(error.message);
            }
        });
        this.completeAppointment = (doctorId, appointmentId) => __awaiter(this, void 0, void 0, function* () {
            try {
                const appointments = yield this.doctorRepository.completeAppointment(doctorId, appointmentId);
                return appointments;
            }
            catch (error) {
                console.log("Error in doctorProfile", error.message);
                throw new Error(error.message);
            }
        });
        this.cancelAppointment = (doctorId, appointmentId) => __awaiter(this, void 0, void 0, function* () {
            try {
                const appointments = yield this.doctorRepository.cancelAppointment(doctorId, appointmentId);
                return appointments;
            }
            catch (error) {
                console.log("Error in doctorProfile", error.message);
                throw new Error(error.message);
            }
        });
        this.updateProfilepic = (doctorId, profilePic) => __awaiter(this, void 0, void 0, function* () {
            try {
                const appointments = yield this.doctorRepository.updateProfilepic(doctorId, profilePic);
                return appointments;
            }
            catch (error) {
                console.log("Error in doctorProfile", error.message);
                throw new Error(error.message);
            }
        });
        this.chatwithUser = (doctorId, appointmentId) => __awaiter(this, void 0, void 0, function* () {
            try {
                const appointments = yield this.doctorRepository.chatwithUser(doctorId, appointmentId);
                return appointments;
            }
            catch (error) {
                console.log("Error in chat", error.message);
                throw new Error(error.message);
            }
        });
        this.sendMessage = (roomId, message) => __awaiter(this, void 0, void 0, function* () {
            try {
                const chatmessage = yield this.doctorRepository.sendMessage(roomId, message);
                return chatmessage;
            }
            catch (error) {
                console.log("Error in chat", error.message);
                throw new Error(error.message);
            }
        });
        this.getMessage = (roomId) => __awaiter(this, void 0, void 0, function* () {
            try {
                const chatmessage = yield this.doctorRepository.getMessage(roomId);
                return chatmessage;
            }
            catch (error) {
                console.log("Error in chat", error.message);
                throw new Error(error.message);
            }
        });
        this.getChatMembers = (doctorId) => __awaiter(this, void 0, void 0, function* () {
            try {
                const chatmessage = yield this.doctorRepository.getChatMembers(doctorId);
                return chatmessage;
            }
            catch (error) {
                console.log("Error in chat", error.message);
                throw new Error(error.message);
            }
        });
        this.forgotPasswordOtp = (email) => __awaiter(this, void 0, void 0, function* () {
            try {
                const otp = yield this.doctorRepository.forgotPasswordOtp(email);
                return otp;
            }
            catch (error) {
                console.log("Error in chat", error.message);
                throw new Error(error.message);
            }
        });
        this.forgotPassword = (otpDataa) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, otp, password } = otpDataa;
                console.log(userId);
                const hashedPassword = yield (0, encription_1.encryptPassword)(password);
                const userotp = yield this.doctorRepository.forgotPassword(userId);
                if (userotp.status !== otp) {
                    throw new Error("Invalid OTP.");
                }
                if (userotp.status == otp) {
                    yield this.doctorRepository.updateDoctorPassword(userId, hashedPassword);
                }
                return Object.assign({}, userotp);
            }
            catch (error) {
                console.log("Error in verifyOtp", error.message);
                throw new Error(error.message);
            }
        });
        this.doctorRepository = doctorRepository;
    }
}
exports.DoctorService = DoctorService;

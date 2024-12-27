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
const otpModel_1 = __importDefault(require("../../../models/otpModel"));
const userModel_1 = __importDefault(require("../../../models/userModel"));
const otpService_1 = require("../otpService");
class OtpService {
    constructor() {
        this.saveOtp = (otpData, email) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, generatedOtp } = otpData;
                yield (0, otpService_1.sendOtpEmail)({
                    email: email,
                    otp: generatedOtp,
                    subject: "Your OTP Code",
                    text: `Your OTP code is: ${generatedOtp}`,
                    html: `<p>Your OTP code is: <b>${generatedOtp}</b></p>`,
                });
                const otpExpirationTime = 1 * 60 * 1000;
                const otp = yield otpModel_1.default.create({
                    userId,
                    otpCode: generatedOtp,
                    expiresAt: new Date(Date.now() + otpExpirationTime)
                });
                console.log(otp);
                return {
                    _id: otp._id.toString(),
                    userId: userId.toString(),
                    otp: generatedOtp,
                    expiryDate: otp.expiresAt
                };
            }
            catch (error) {
                console.error("Error adding otp:", error);
                if (error.code === 11000) {
                    const field = Object.keys(error.keyValue)[0];
                    const value = error.keyValue[field];
                    error.message = `${field} '${value}' already exists.`;
                }
                throw new Error(error.message);
            }
        });
        this.resendOtp = (userId) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield userModel_1.default.findOne({ _id: userId });
                if (!user) {
                    throw new Error("User not found.");
                }
                const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
                const otpExpirationTime = 1 * 60 * 1000;
                yield (0, otpService_1.sendOtpEmail)({
                    email: user.email,
                    otp: generatedOtp,
                    subject: "Your OTP Code",
                    text: `Your OTP code is: ${generatedOtp}`,
                    html: `<p>Your OTP code is: <b>${generatedOtp}</b></p>`,
                });
                const newOtp = yield otpModel_1.default.create({
                    userId,
                    otpCode: generatedOtp,
                    expiresAt: new Date(Date.now() + otpExpirationTime),
                });
                console.log("New OTP generated:", newOtp);
                return {
                    _id: newOtp._id.toString(),
                    userId: userId.toString(),
                    otp: generatedOtp,
                    expiryDate: newOtp.expiresAt,
                };
            }
            catch (error) {
                console.error("Error resending OTP:", error);
                throw new Error(error.message);
            }
        });
    }
}
exports.default = OtpService;

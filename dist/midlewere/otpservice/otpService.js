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
exports.sendOtpEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const transpoter = nodemailer_1.default.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASS
    }
});
const sendOtpEmail = (options) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, otp, text, html, subject } = options;
    const mailOptions = {
        from: `"Docreserva" <${process.env.USER_EMAIL}>`,
        to: email,
        subject,
        text: text || `Your OTP code is: ${otp}`,
        html: html || `<p>Your OTP code is: <b>${otp}</b></p>`,
    };
    try {
        yield transpoter.sendMail(mailOptions);
        console.log(`OTP sent successfully to ${email}`);
        return true;
    }
    catch (error) {
        console.error("Error sending OTP email:", error);
        return false;
    }
});
exports.sendOtpEmail = sendOtpEmail;

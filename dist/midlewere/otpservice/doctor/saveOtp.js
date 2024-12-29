import Otp from "../../../models/otpModel";
import Doctor from "../../../models/doctorModel";
import { sendOtpEmail } from '../otpService';
class OtpService {
    constructor() {
        this.saveOtp = async (otpData, email) => {
            try {
                const { userId, generatedOtp } = otpData;
                await sendOtpEmail({
                    email: email,
                    otp: generatedOtp,
                    subject: "Your OTP Code",
                    text: `Your OTP code is: ${generatedOtp}`,
                    html: `<p>Your OTP code is: <b>${generatedOtp}</b></p>`,
                });
                const otpExpirationTime = 1 * 60 * 1000;
                const otp = await Otp.create({
                    userId,
                    otpCode: generatedOtp,
                    expiresAt: new Date(Date.now() + otpExpirationTime)
                });
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
        };
        this.resendOtp = async (userId) => {
            try {
                const doctor = await Doctor.findOne({ _id: userId });
                if (!doctor) {
                    throw new Error("Doctor not found.");
                }
                const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
                const otpExpirationTime = 1 * 60 * 1000;
                await sendOtpEmail({
                    email: doctor.email,
                    otp: generatedOtp,
                    subject: "Your OTP Code",
                    text: `Your OTP code is: ${generatedOtp}`,
                    html: `<p>Your OTP code is: <b>${generatedOtp}</b></p>`,
                });
                const newOtp = await Otp.create({
                    userId: userId,
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
                console.error("Error resending doctor OTP:", error);
                throw new Error(error.message);
            }
        };
    }
}
export default OtpService;

import { encryptPassword, comparePassword } from "../utils/encription";
import { AppError } from "../utils/errors";
import { generateAccessToken, generateRefreshToken, } from "../utils/generateJWT";
export class DoctorService {
    doctorRepository;
    constructor(doctorRepository) {
        this.doctorRepository = doctorRepository;
    }
    doctorSignup = async (doctorData) => {
        try {
            const encryptedPassword = encryptPassword(doctorData.password);
            const doctor = await this.doctorRepository.addDoctor({
                ...doctorData,
                password: encryptedPassword,
            });
            const accessToken = generateAccessToken(doctor._id, "doctor");
            const refreshToken = generateRefreshToken(doctor._id, "doctor");
            return { ...doctor, accessToken, refreshToken };
        }
        catch (error) {
            console.log("Error in user service", error.message);
            throw new Error(error.message);
        }
    };
    verifyOtp = async (otpData) => {
        try {
            const { userId, otp } = otpData;
            const userotp = await this.doctorRepository.verifyOtp({ userId });
            if (userotp.otp !== otp) {
                throw new Error("Invalid OTP.");
            }
            if (userotp.otp == otp) {
                await this.doctorRepository.updateDoctorOtp(userId);
            }
            return { ...userotp };
        }
        catch (error) {
            console.log("Error in verifyOtp", error.message);
            throw new Error(error.message);
        }
    };
    doctorLogin = async (email, password) => {
        try {
            const user = await this.doctorRepository.getDoctorByEmail(email);
            const isValidPassword = comparePassword(password, user.password);
            if (!isValidPassword)
                throw new AppError("Invalid Credentials", 401);
            const accessToken = generateAccessToken(user._id, "doctor");
            const refreshToken = generateRefreshToken(user._id, "doctor");
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
    };
    doctorProfile = async (userId) => {
        try {
            const user = await this.doctorRepository.getDoctorProfile(userId);
            return {
                ...user,
            };
        }
        catch (error) {
            console.log("Error in doctorProfile", error.message);
            throw new Error(error.message);
        }
    };
    updateProfile = async (formData, userId) => {
        try {
            const doctor = await this.doctorRepository.updateDoctorProfile(formData, userId);
            return {
                ...doctor,
            };
        }
        catch (error) {
            console.log("Error in doctorProfile", error.message);
            throw new Error(error.message);
        }
    };
    changeProfile = async (userId, formData) => {
        try {
            const doctor = await this.doctorRepository.changeProfile(userId, formData);
            return {
                ...doctor,
            };
        }
        catch (error) {
            console.log("Error in doctorProfile", error.message);
            throw new Error(error.message);
        }
    };
    changePassword = async (userId, oldPassword, newPassword) => {
        try {
            let doctor = await this.doctorRepository.changePassword(userId, oldPassword, newPassword);
            const hashedPassword = await encryptPassword(newPassword);
            const isValidPassword = comparePassword(oldPassword, doctor?.password);
            if (isValidPassword) {
                doctor = await this.doctorRepository.changePassword(userId, hashedPassword, oldPassword);
            }
            if (!isValidPassword)
                throw new AppError("Invalid Credentials", 401);
            return {
                ...doctor,
            };
        }
        catch (error) {
            console.log("Error in changepassword", error.message);
            throw new Error(error.message);
        }
    };
    getAppointments = async (doctorId) => {
        try {
            const appointments = await this.doctorRepository.getAppointments(doctorId);
            return appointments;
        }
        catch (error) {
            console.log("Error in doctorProfile", error.message);
            throw new Error(error.message);
        }
    };
    resheduleAppointment = async (doctorId, payloadData) => {
        try {
            const appointments = await this.doctorRepository.resheduleAppointment(doctorId, payloadData);
            return appointments;
        }
        catch (error) {
            console.log("Error in doctorProfile", error.message);
            throw new Error(error.message);
        }
    };
    completeAppointment = async (doctorId, appointmentId) => {
        try {
            const appointments = await this.doctorRepository.completeAppointment(doctorId, appointmentId);
            return appointments;
        }
        catch (error) {
            console.log("Error in doctorProfile", error.message);
            throw new Error(error.message);
        }
    };
    cancelAppointment = async (doctorId, appointmentId) => {
        try {
            const appointments = await this.doctorRepository.cancelAppointment(doctorId, appointmentId);
            return appointments;
        }
        catch (error) {
            console.log("Error in doctorProfile", error.message);
            throw new Error(error.message);
        }
    };
    updateProfilepic = async (doctorId, profilePic) => {
        try {
            const appointments = await this.doctorRepository.updateProfilepic(doctorId, profilePic);
            return appointments;
        }
        catch (error) {
            console.log("Error in doctorProfile", error.message);
            throw new Error(error.message);
        }
    };
    chatwithUser = async (doctorId, appointmentId) => {
        try {
            const appointments = await this.doctorRepository.chatwithUser(doctorId, appointmentId);
            return appointments;
        }
        catch (error) {
            console.log("Error in chat", error.message);
            throw new Error(error.message);
        }
    };
    sendMessage = async (roomId, message) => {
        try {
            const chatmessage = await this.doctorRepository.sendMessage(roomId, message);
            return chatmessage;
        }
        catch (error) {
            console.log("Error in chat", error.message);
            throw new Error(error.message);
        }
    };
    getMessage = async (roomId) => {
        try {
            const chatmessage = await this.doctorRepository.getMessage(roomId);
            return chatmessage;
        }
        catch (error) {
            console.log("Error in chat", error.message);
            throw new Error(error.message);
        }
    };
    getChatMembers = async (doctorId) => {
        try {
            const chatmessage = await this.doctorRepository.getChatMembers(doctorId);
            return chatmessage;
        }
        catch (error) {
            console.log("Error in chat", error.message);
            throw new Error(error.message);
        }
    };
    forgotPasswordOtp = async (email) => {
        try {
            const otp = await this.doctorRepository.forgotPasswordOtp(email);
            return otp;
        }
        catch (error) {
            console.log("Error in chat", error.message);
            throw new Error(error.message);
        }
    };
    forgotPassword = async (otpDataa) => {
        try {
            const { userId, otp, password } = otpDataa;
            console.log(userId);
            const hashedPassword = await encryptPassword(password);
            const userotp = await this.doctorRepository.forgotPassword(userId);
            if (userotp.status !== otp) {
                throw new Error("Invalid OTP.");
            }
            if (userotp.status == otp) {
                await this.doctorRepository.updateDoctorPassword(userId, hashedPassword);
            }
            return { ...userotp };
        }
        catch (error) {
            console.log("Error in verifyOtp", error.message);
            throw new Error(error.message);
        }
    };
}

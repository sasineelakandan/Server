import { encryptPassword, comparePassword } from "../utils/encription";
import { AppError } from "../utils/errors";
import { generateAccessToken, generateRefreshToken, } from "../utils/generateJWT";
export class UserService {
    constructor(userRepository) {
        this.userSignup = async (userData) => {
            try {
                const encryptedPassword = encryptPassword(userData.password);
                const user = await this.userRepository.addUser({
                    ...userData,
                    password: encryptedPassword,
                });
                const accessToken = generateAccessToken(user._id, "user");
                const refreshToken = generateRefreshToken(user._id, "user");
                return { ...user, accessToken, refreshToken };
            }
            catch (error) {
                console.log("Error in user service", error.message);
                throw new Error(error.message);
            }
        };
        this.verifyOtp = async (otpData) => {
            try {
                const { userId, otp } = otpData;
                const userotp = await this.userRepository.verifyOtp({ userId });
                if (userotp.otp !== otp) {
                    throw new Error("Invalid OTP.");
                }
                if (userotp.otp == otp) {
                    await this.userRepository.updateUserOtp(userId);
                }
                return { ...userotp };
            }
            catch (error) {
                console.log("Error in verifyOtp", error.message);
                throw new Error(error.message);
            }
        };
        this.userLogin = async (email, password) => {
            try {
                const user = await this.userRepository.getUserByEmail(email);
                const isValidPassword = comparePassword(password, user.password);
                if (!isValidPassword)
                    throw new AppError("Invalid Credentials", 401);
                const accessToken = generateAccessToken(user._id, "user");
                const refreshToken = generateRefreshToken(user._id, "user");
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
        };
        this.userProfile = async (userId) => {
            try {
                const user = await this.userRepository.userProfile(userId);
                console.log(user);
                return {
                    _id: user._id,
                    username: user.username,
                    email: user.email,
                    phone: user.phone,
                    profilePic: user?.profilePic,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt,
                };
            }
            catch (error) {
                console.log("Error in userLogin", error.message);
                throw new Error(error.message);
            }
        };
        this.changeProfile = async (userId, name, phone) => {
            try {
                const user = await this.userRepository.changeProfile(userId, name, phone);
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
        };
        this.changePassword = async (userId, oldPassword, newPassword) => {
            try {
                let user = await this.userRepository.changePassword(userId, oldPassword, newPassword);
                const hashedPassword = await encryptPassword(newPassword);
                const isValidPassword = comparePassword(oldPassword, user?.password);
                if (isValidPassword) {
                    user = await this.userRepository.changePassword(userId, hashedPassword, oldPassword);
                }
                if (!isValidPassword)
                    throw new AppError("Invalid Credentials", 401);
                return {
                    _id: user._id,
                    username: user.username,
                    email: user.email,
                    phone: user.phone,
                    profilePic: user?.profilePic,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt,
                };
            }
            catch (error) {
                console.log("Error in changepassword", error.message);
                throw new Error(error.message);
            }
        };
        this.getAppointments = async (userId) => {
            try {
                const appointments = await this.userRepository.getAppointments(userId);
                return appointments;
            }
            catch (error) {
                console.log("Error in doctorProfile", error.message);
                throw new Error(error.message);
            }
        };
        this.cancelAppointments = async (userId, appointmentId) => {
            try {
                const appointments = await this.userRepository.cancelAppointments(userId, appointmentId);
                return appointments;
            }
            catch (error) {
                console.log("Error in doctorProfile", error.message);
                throw new Error(error.message);
            }
        };
        this.updateProfilePic = async (userId, profilePic) => {
            try {
                const appointments = await this.userRepository.updateProfilePic(userId, profilePic);
                return appointments;
            }
            catch (error) {
                console.log("Error in doctorProfile", error.message);
                throw new Error(error.message);
            }
        };
        this.chatwithDoctor = async (userId, appointmentId) => {
            try {
                const appointments = await this.userRepository.chatwithDoctor(userId, appointmentId);
                return appointments;
            }
            catch (error) {
                console.log("Error in chat", error.message);
                throw new Error(error.message);
            }
        };
        this.sendMessage = async (roomId, message) => {
            try {
                const chatmessage = await this.userRepository.sendMessage(roomId, message);
                return chatmessage;
            }
            catch (error) {
                console.log("Error in chat", error.message);
                throw new Error(error.message);
            }
        };
        this.getMessage = async (roomId) => {
            try {
                const chatmessage = await this.userRepository.getMessage(roomId);
                return chatmessage;
            }
            catch (error) {
                console.log("Error in chat", error.message);
                throw new Error(error.message);
            }
        };
        this.getChatMembers = async (userId) => {
            try {
                const chatmessage = await this.userRepository.getChatMembers(userId);
                return chatmessage;
            }
            catch (error) {
                console.log("Error in chat", error.message);
                throw new Error(error.message);
            }
        };
        this.slotAsign = async (userId, slotData) => {
            try {
                const data = await this.userRepository.slotAsign(userId, slotData);
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
        };
        this.getcompleteAppointment = async (userId) => {
            try {
                const data = await this.userRepository.getcompleteAppointment(userId);
                console.log(data);
                return data;
            }
            catch (error) {
                console.log("Error in doctorProfile", error.message);
                throw new Error(error.message);
            }
        };
        this.userReview = async (userId, Review) => {
            try {
                const data = await this.userRepository.userReview(userId, Review);
                return {
                    reviewText: data?.reviewText,
                    rating: data?.rating,
                    createdAt: data?.createdAt.toString()
                };
            }
            catch (error) {
                console.log("Error in doctorProfile", error.message);
                throw new Error(error.message);
            }
        };
        this.googleLogin = async (GoogleUser) => {
            try {
                function generateUniquePhoneNumber() {
                    const firstDigit = Math.floor(Math.random() * 4) + 6;
                    const restOfTheNumber = Math.floor(Math.random() * 900000000) + 100000000;
                    const phoneNumber = `${firstDigit}${restOfTheNumber}`;
                    return phoneNumber;
                }
                const uniquePhoneNumber = generateUniquePhoneNumber();
                const phone = uniquePhoneNumber.toString();
                const user = await this.userRepository.googleLogin({
                    ...GoogleUser,
                    phone: phone
                });
                const accessToken = generateAccessToken(user._id, "user");
                const refreshToken = generateRefreshToken(user._id, "user");
                return { ...user, accessToken, refreshToken };
            }
            catch (error) {
                console.log("Error in user service", error.message);
                throw new Error(error.message);
            }
        };
        this.getReview = async (doctorId) => {
            try {
                const data = await this.userRepository.getReview(doctorId);
                return data;
            }
            catch (error) {
                console.log("Error in doctorProfile", error.message);
                throw new Error(error.message);
            }
        };
        this.userRepository = userRepository;
    }
}

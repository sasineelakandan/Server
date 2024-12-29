import Doctor from "../models/doctorModel";
import Otp from "../models/otpModel";
import Slot from "../models/slotsModel";
import Appointment from "../models/appointmentModel";
import ChatRoom from "../models/chatRoomModel";
import Message from "../models/messageModel";
import { io } from "../../src/index";
export class DoctorRepository {
    addDoctor = async (doctorData) => {
        try {
            const doctor = await Doctor.create({
                ...doctorData,
            });
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
    };
    verifyOtp = async (doctorOtpData) => {
        try {
            const { userId } = doctorOtpData;
            const otp = await Otp.findOne({ userId: userId });
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
    };
    updateDoctorOtp = async (userId) => {
        try {
            const user = await Doctor.updateOne({ _id: userId }, { $set: { isOtpVerified: true } });
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
    };
    getDoctorByEmail = async (email) => {
        try {
            const user = await Doctor.findOne({ email, isOtpVerified: true });
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
    };
    getDoctorProfile = async (userId) => {
        try {
            const doctor = await Doctor.findOne({ _id: userId });
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
                fees: doctor.fees?.toString() || "",
                licenseNumber: doctor.licenseNumber?.toString() || "",
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
    };
    updateDoctorProfile = async (formData, userId) => {
        try {
            const { licenseImage, licenseImage1, hospitalName, fees, licenseNumber } = formData;
            const updateDoctor = await Doctor.updateOne({ _id: userId }, { $set: {
                    licenseImage: licenseImage,
                    profilePic: licenseImage1,
                    hospitalName: hospitalName,
                    fees: fees,
                    licenseNumber: licenseNumber
                } });
            const doctor = await Doctor.findOne({ _id: userId });
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
                fees: doctor.fees?.toString() || "",
                licenseNumber: doctor.licenseNumber?.toString() || "",
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
    };
    changeProfile = async (userId, formData) => {
        try {
            const { phone, name, hospitalName, fees, experience } = formData;
            const updateDoctor = await Doctor.updateOne({ _id: userId }, { $set: {
                    name: name,
                    phone: phone,
                    hospitalName: hospitalName,
                    fees: fees,
                    experience: experience
                } });
            const doctor = await Doctor.findOne({ _id: userId });
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
                fees: doctor.fees?.toString() || "",
                licenseNumber: doctor.licenseNumber?.toString() || "",
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
    };
    changePassword = async (userId, hashedPassword, oldPassword) => {
        try {
            const doctor = await Doctor.findOne({ _id: userId });
            if (!doctor) {
                throw new Error(`Doctor with ID ${userId} not found.`);
            }
            const userUpdate = await Doctor.updateOne({ _id: userId }, { $set: { password: hashedPassword } });
            return {
                _id: doctor._id.toString(),
                name: doctor.name || "",
                email: doctor.email || "",
                phone: doctor.phone || "",
                specialization: doctor.specialization || "",
                licenseImage: doctor.licenseImage || "",
                hospitalName: doctor.hospitalName || "",
                fees: doctor.fees?.toString() || "",
                licenseNumber: doctor.licenseNumber?.toString() || "",
                profilePic: doctor.profilePic || "",
                experience: doctor.experience.toString() || "",
                isVerified: doctor.isVerified,
                password: doctor.password,
                location: doctor?.location,
                createdAt: doctor.createdAt,
                updatedAt: doctor.updatedAt,
            };
        }
        catch (error) {
            console.error("Error find loginUser:", error);
            throw new Error(error.message);
        }
    };
    getAppointments = async (doctorId) => {
        try {
            const appointments = await Appointment.find({ doctorId: doctorId }).sort({ _id: -1 })
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
    };
    resheduleAppointment = async (doctorId, payloadData) => {
        try {
            const { date, startTime, endTime, appointmentId } = payloadData;
            const appointments = await Appointment.findOne({ doctorId: doctorId, _id: appointmentId });
            const slotUpdate = await Slot.updateOne({ _id: appointments?.slotId }, { $set: { date: date, startTime: startTime, endTime: endTime } });
            const updateAppointment = await Appointment.updateOne({ _id: appointmentId }, { $set: { status: 'rescheduled' } });
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
    };
    completeAppointment = async (doctorId, appointmentId) => {
        try {
            const updateAppointment = await Appointment.updateOne({ _id: appointmentId }, { $set: { status: 'completed' } });
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
    };
    cancelAppointment = async (doctorId, appointmentId) => {
        try {
            const updateAppointment = await Appointment.updateOne({ _id: appointmentId }, { $set: { status: 'canceled' } });
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
    };
    updateProfilepic = async (doctorId, profilePic) => {
        try {
            const updateProfilePic = await Doctor.updateOne({ _id: doctorId }, { $set: { profilePic: profilePic } });
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
    };
    chatwithUser = async (doctorId, appointmentId) => {
        try {
            if (!doctorId) {
                throw new Error(`User with ID ${doctorId} not found.`);
            }
            if (!appointmentId) {
                throw new Error(`Appointment with ID ${appointmentId} not found.`);
            }
            const chatter = await Appointment.findOne({ _id: appointmentId, doctorId: doctorId });
            const existingRoom = await ChatRoom.findOne({ patient: chatter?.userId, doctor: doctorId });
            if (existingRoom) {
                return {
                    status: existingRoom?._id.toString(),
                    message: "Chat room already exists.",
                };
            }
            const newChatRoom = new ChatRoom({
                patient: chatter?.userId,
                doctor: doctorId,
            });
            const savedRoom = await newChatRoom.save();
            return {
                status: savedRoom?._id.toString(),
                message: "Chat room created successfully",
            };
        }
        catch (error) {
            console.error("Error in chatroom:", error);
            throw new Error(error.message);
        }
    };
    sendMessage = async (roomId, message) => {
        try {
            // Validate inputs
            if (!roomId) {
                throw new Error("Room ID is required.");
            }
            if (!message) {
                throw new Error("Message content is required.");
            }
            // Find the chat room
            const chatter = await ChatRoom.findOne({ _id: roomId });
            if (!chatter) {
                throw new Error(`Chat room with ID ${roomId} not found.`);
            }
            await ChatRoom.updateOne({ _id: roomId }, { $set: { lastMessage: message?.content } });
            const updatedRoom = await ChatRoom.findOne({ _id: roomId });
            console.log('Updated Chat Room:', updatedRoom);
            const createMsg = await Message.create({
                sender: chatter.patient,
                receiver: chatter.doctor,
                roomId,
                content: message?.content,
            });
            io.to(roomId).emit("message", { createMsg });
            return {
                status: "success",
                message: "Message sent successfully.",
            };
        }
        catch (error) {
            console.error("Error in sendMessage doctor:", error);
            throw new Error(error.message);
        }
    };
    getMessage = async (roomId) => {
        try {
            if (!roomId) {
                throw new Error(`User with ID ${roomId} not found.`);
            }
            const chatRoomUp = await Message.updateMany({ roomId: roomId }, { $set: { isRead: true } });
            const message = await Message.find({ roomId: roomId });
            return message;
        }
        catch (error) {
            console.error("Error in chatroom:", error);
            throw new Error(error.message);
        }
    };
    getChatMembers = async (doctorId) => {
        try {
            if (!doctorId) {
                throw new Error(`User with ID ${doctorId} not found.`);
            }
            const message = await ChatRoom.find({ doctor: doctorId }).populate('patient');
            return message;
        }
        catch (error) {
            console.error("Error in chatroom:", error);
            throw new Error(error.message);
        }
    };
    forgotPasswordOtp = async (email) => {
        try {
            const doctor = await Doctor.findOne({ email: email });
            if (!email) {
                throw new Error(`Doctor with ID ${email} not found.`);
            }
            return {
                status: doctor?._id.toString() || '',
                message: 'Slot assigned successfully',
            };
        }
        catch (error) {
            console.error("Error in slot creation:", error);
            throw new Error(error.message);
        }
    };
    forgotPassword = async (userId) => {
        try {
            const otp = await Otp.findOne({ userId: userId });
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
    };
    updateDoctorPassword = async (userId, password) => {
        try {
            const user = await Doctor.updateOne({ _id: userId }, { $set: { password } });
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
    };
}

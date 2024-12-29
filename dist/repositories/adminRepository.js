import Appointment from "../models/appointmentModel";
import Doctor from "../models/doctorModel";
import Review from "../models/reviewModel";
import User from "../models/userModel";
export class AdminRepository {
    constructor() {
        this.patientDetails = async (admin) => {
            try {
                if (!admin) {
                    return null;
                }
                const users = await User.find({ isDelete: false });
                if (!users || users.length === 0) {
                    return null;
                }
                return users;
            }
            catch (error) {
                console.error("Error finding users:", error.message);
                return null;
            }
        };
        this.isBlocked = async (email, userId) => {
            try {
                if (!userId) {
                    return { success: false, message: "User ID is required" };
                }
                const user = await User.findOne({ _id: userId });
                if (!user) {
                    throw new Error("User not found");
                }
                const updatedBlockStatus = !user.isBlock;
                const updateResult = await User.updateOne({ _id: userId }, { $set: { isBlock: updatedBlockStatus } });
                if (updateResult.modifiedCount > 0) {
                    return { success: true };
                }
                else {
                    return { success: false, message: "Failed to update block status" };
                }
            }
            catch (error) {
                console.error("Error finding or updating user:", error);
                throw new Error("Unable to fetch users. Please try again later.");
            }
        };
        this.isDelete = async (userId) => {
            try {
                if (!userId) {
                    return { success: false, message: "User ID is required" };
                }
                const user = await User.findOne({ _id: userId });
                if (!user) {
                    throw new Error("User not found");
                }
                const updatedStatus = !user.isDelete;
                const updateResult = await User.updateOne({ _id: userId }, { $set: { isDelete: updatedStatus } });
                if (updateResult.modifiedCount > 0) {
                    return { success: true };
                }
                else {
                    return { success: false, message: "Failed to update block status" };
                }
            }
            catch (error) {
                console.error("Error finding or updating user:", error);
                throw new Error("Unable to fetch users. Please try again later.");
            }
        };
        this.isVerify = async (userId) => {
            try {
                if (!userId) {
                    return { success: false, message: "User ID is required" };
                }
                const doctors = await Doctor.findOne({ _id: userId });
                if (!doctors) {
                    throw new Error("User not found");
                }
                console.log(doctors);
                const updatedStatus = !doctors.isVerified;
                const updateResult = await Doctor.updateOne({ _id: userId }, { $set: { isVerified: updatedStatus } });
                if (updateResult.modifiedCount > 0) {
                    return { success: true };
                }
                else {
                    return { success: false, message: "Failed to update block status" };
                }
            }
            catch (error) {
                console.error("Error finding or updating user:", error);
                throw new Error("Unable to fetch users. Please try again later.");
            }
        };
        this.doctorDetails = async (admin) => {
            try {
                if (!admin) {
                    return null;
                }
                console.log(admin);
                const doctors = await Doctor.find({ isDeleted: false, isOtpVerified: true, isVerified: false });
                if (!doctors || doctors.length === 0) {
                    return null;
                }
                return doctors;
            }
            catch (error) {
                console.error("Error finding users:", error.message);
                return null;
            }
        };
        this.verifiedDoctors = async (admin) => {
            try {
                if (!admin) {
                    return null;
                }
                const doctors = await Doctor.find({ isDeleted: false, isOtpVerified: true, isVerified: true });
                if (!doctors || doctors.length === 0) {
                    return null;
                }
                return doctors;
            }
            catch (error) {
                console.error("Error finding users:", error.message);
                return null;
            }
        };
        this.doctorBlock = async (doctorId) => {
            try {
                if (!doctorId) {
                    return { success: false, message: "User ID is required" };
                }
                const user = await Doctor.findOne({ _id: doctorId });
                if (!user) {
                    throw new Error("doctor not found");
                }
                const updatedBlockStatus = !user.isBlocked;
                const updateResult = await Doctor.updateOne({ _id: doctorId }, { $set: { isBlocked: updatedBlockStatus } });
                if (updateResult.modifiedCount > 0) {
                    return { success: true };
                }
                else {
                    return { success: false, message: "Failed to update block status" };
                }
            }
            catch (error) {
                console.error("Error finding or updating user:", error);
                throw new Error("Unable to fetch users. Please try again later.");
            }
        };
        this.deleteDoctor = async (doctorId) => {
            try {
                if (!doctorId) {
                    return { success: false, message: "User ID is required" };
                }
                const user = await Doctor.findOne({ _id: doctorId });
                if (!user) {
                    throw new Error("User not found");
                }
                const updatedStatus = !user.isDeleted;
                const updateResult = await Doctor.updateOne({ _id: doctorId }, { $set: { isDeleted: updatedStatus } });
                if (updateResult.modifiedCount > 0) {
                    return { success: true };
                }
                else {
                    return { success: false, message: "Failed to update block status" };
                }
            }
            catch (error) {
                console.error("Error finding or updating user:", error);
                throw new Error("Unable to fetch users. Please try again later.");
            }
        };
        this.getAppoinments = async (admin) => {
            try {
                if (!admin) {
                    return null;
                }
                const appointments = await Appointment.find({ status: 'completed' }).sort({ _id: -1 })
                    .populate('slotId')
                    .populate('doctorId')
                    .populate('patientId')
                    .populate('userId')
                    .populate('paymentId');
                if (!appointments || appointments.length === 0) {
                    return null;
                }
                return appointments;
            }
            catch (error) {
                console.error("Error finding appointments:", error.message);
                return null;
            }
        };
        this.getReviews = async (admin) => {
            try {
                if (!admin) {
                    return null;
                }
                const reviews = await Review.find().sort({ _id: -1 })
                    .populate('doctorId')
                    .populate('userId');
                if (!reviews || reviews.length === 0) {
                    return null;
                }
                return reviews;
            }
            catch (error) {
                console.error("Error finding appointments:", error.message);
                return null;
            }
        };
        this.deleteReviews = async (review) => {
            try {
                if (!review) {
                    return { success: false, message: "User ID is required" };
                }
                console.log(review);
                const user = await Review.deleteOne({ _id: review });
                return { success: true };
            }
            catch (error) {
                console.error("Error finding or updating user:", error);
                throw new Error("Unable to fetch users. Please try again later.");
            }
        };
    }
}

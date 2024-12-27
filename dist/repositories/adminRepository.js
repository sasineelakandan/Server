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
exports.AdminRepository = void 0;
const appointmentModel_1 = __importDefault(require("../models/appointmentModel"));
const doctorModel_1 = __importDefault(require("../models/doctorModel"));
const reviewModel_1 = __importDefault(require("../models/reviewModel"));
const userModel_1 = __importDefault(require("../models/userModel"));
class AdminRepository {
    constructor() {
        this.patientDetails = (admin) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!admin) {
                    return null;
                }
                const users = yield userModel_1.default.find({ isDelete: false });
                if (!users || users.length === 0) {
                    return null;
                }
                return users;
            }
            catch (error) {
                console.error("Error finding users:", error.message);
                return null;
            }
        });
        this.isBlocked = (email, userId) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!userId) {
                    return { success: false, message: "User ID is required" };
                }
                const user = yield userModel_1.default.findOne({ _id: userId });
                if (!user) {
                    throw new Error("User not found");
                }
                const updatedBlockStatus = !user.isBlock;
                const updateResult = yield userModel_1.default.updateOne({ _id: userId }, { $set: { isBlock: updatedBlockStatus } });
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
        });
        this.isDelete = (userId) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!userId) {
                    return { success: false, message: "User ID is required" };
                }
                const user = yield userModel_1.default.findOne({ _id: userId });
                if (!user) {
                    throw new Error("User not found");
                }
                const updatedStatus = !user.isDelete;
                const updateResult = yield userModel_1.default.updateOne({ _id: userId }, { $set: { isDelete: updatedStatus } });
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
        });
        this.isVerify = (userId) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!userId) {
                    return { success: false, message: "User ID is required" };
                }
                const doctors = yield doctorModel_1.default.findOne({ _id: userId });
                if (!doctors) {
                    throw new Error("User not found");
                }
                console.log(doctors);
                const updatedStatus = !doctors.isVerified;
                const updateResult = yield doctorModel_1.default.updateOne({ _id: userId }, { $set: { isVerified: updatedStatus } });
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
        });
        this.doctorDetails = (admin) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!admin) {
                    return null;
                }
                console.log(admin);
                const doctors = yield doctorModel_1.default.find({ isDeleted: false, isOtpVerified: true, isVerified: false });
                if (!doctors || doctors.length === 0) {
                    return null;
                }
                return doctors;
            }
            catch (error) {
                console.error("Error finding users:", error.message);
                return null;
            }
        });
        this.verifiedDoctors = (admin) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!admin) {
                    return null;
                }
                const doctors = yield doctorModel_1.default.find({ isDeleted: false, isOtpVerified: true, isVerified: true });
                if (!doctors || doctors.length === 0) {
                    return null;
                }
                return doctors;
            }
            catch (error) {
                console.error("Error finding users:", error.message);
                return null;
            }
        });
        this.doctorBlock = (doctorId) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!doctorId) {
                    return { success: false, message: "User ID is required" };
                }
                const user = yield doctorModel_1.default.findOne({ _id: doctorId });
                if (!user) {
                    throw new Error("doctor not found");
                }
                const updatedBlockStatus = !user.isBlocked;
                const updateResult = yield doctorModel_1.default.updateOne({ _id: doctorId }, { $set: { isBlocked: updatedBlockStatus } });
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
        });
        this.deleteDoctor = (doctorId) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!doctorId) {
                    return { success: false, message: "User ID is required" };
                }
                const user = yield doctorModel_1.default.findOne({ _id: doctorId });
                if (!user) {
                    throw new Error("User not found");
                }
                const updatedStatus = !user.isDeleted;
                const updateResult = yield doctorModel_1.default.updateOne({ _id: doctorId }, { $set: { isDeleted: updatedStatus } });
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
        });
        this.getAppoinments = (admin) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!admin) {
                    return null;
                }
                const appointments = yield appointmentModel_1.default.find({ status: 'completed' }).sort({ _id: -1 })
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
        });
        this.getReviews = (admin) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!admin) {
                    return null;
                }
                const reviews = yield reviewModel_1.default.find().sort({ _id: -1 })
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
        });
        this.deleteReviews = (review) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!review) {
                    return { success: false, message: "User ID is required" };
                }
                console.log(review);
                const user = yield reviewModel_1.default.deleteOne({ _id: review });
                return { success: true };
            }
            catch (error) {
                console.error("Error finding or updating user:", error);
                throw new Error("Unable to fetch users. Please try again later.");
            }
        });
    }
}
exports.AdminRepository = AdminRepository;

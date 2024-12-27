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
exports.AdminService = void 0;
const constant_1 = require("../utils/constant");
const generateJWT_1 = require("../utils/generateJWT");
class AdminService {
    constructor(adminRepository) {
        this.adminLogin = (email, password) => __awaiter(this, void 0, void 0, function* () {
            try {
                const envEmail = constant_1.ADMIN_EMAIL;
                const envPassword = constant_1.ADMIN_PASSWORD;
                if (!envEmail || !envPassword) {
                    throw new Error("Environment variables for email or password are not set");
                }
                if (email === envEmail && password === envPassword) {
                    const accessToken = (0, generateJWT_1.generateAccessToken)(envEmail, "admin");
                    const refreshToken = (0, generateJWT_1.generateRefreshToken)(envEmail, "admin");
                    return { admin: true, accessToken, refreshToken };
                }
                else {
                    return { admin: false };
                }
            }
            catch (error) {
                console.log("Error in user service", error.message);
                throw new Error(error.message);
            }
        });
        this.patientDetails = (admin) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!admin) {
                    // If no admin identifier is provided, return null or an empty object
                    return null;
                }
                // Fetch patient details from the repository
                const users = yield this.adminRepository.patientDetails(admin);
                if (!users) {
                    // Return null if no user details are found
                    return null;
                }
                // Return the fetched user data
                return users;
            }
            catch (error) {
                console.log("Error in user service:", error.message);
                return null;
            }
        });
        this.isBlocked = (email, userId) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!email) {
                    return { success: false, message: "Email is required" };
                }
                const users = yield this.adminRepository.isBlocked(email, userId);
                if (!users) {
                    return { success: false, message: "User not found or error fetching data" };
                }
                return { success: true, message: "User block status fetched successfully" };
            }
            catch (error) {
                console.log("Error in user service", error.message);
                return { success: false, message: `Error: ${error.message}` }; // Return error message
            }
        });
        this.isDelete = (userId) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!userId) {
                    return { success: false, message: "userId is required" };
                }
                const users = yield this.adminRepository.isDelete(userId);
                if (!users) {
                    return { success: false, message: "User not found or error fetching data" };
                }
                return { success: true, message: "User block status fetched successfully" };
            }
            catch (error) {
                console.log("Error in user service", error.message);
                return { success: false, message: `Error: ${error.message}` }; // Return error message
            }
        });
        this.isVerify = (userId) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!userId) {
                    return { success: false, message: "userId is required" };
                }
                const users = yield this.adminRepository.isVerify(userId);
                if (!users) {
                    return { success: false, message: "User not found or error fetching data" };
                }
                return { success: true, message: "User block status fetched successfully" };
            }
            catch (error) {
                console.log("Error in user service", error.message);
                return { success: false, message: `Error: ${error.message}` }; // Return error message
            }
        });
        this.doctorDetails = (admin) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!admin) {
                    return null;
                }
                const doctors = yield this.adminRepository.doctorDetails(admin);
                if (!doctors) {
                    return null;
                }
                return doctors;
            }
            catch (error) {
                console.log("Error in user service:", error.message);
                return null;
            }
        });
        this.verifiedDoctors = (admin) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!admin) {
                    return null;
                }
                const doctors = yield this.adminRepository.verifiedDoctors(admin);
                if (!doctors) {
                    return null;
                }
                return doctors;
            }
            catch (error) {
                console.log("Error in user service:", error.message);
                return null;
            }
        });
        this.doctorBlock = (doctorId) => __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.adminRepository.doctorBlock(doctorId);
                if (!users) {
                    return { success: false, message: "User not found or error fetching data" };
                }
                return { success: true, message: "User block status fetched successfully" };
            }
            catch (error) {
                console.log("Error in user service", error.message);
                return { success: false, message: `Error: ${error.message}` }; // Return error message
            }
        });
        this.deleteDoctor = (doctorId) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!doctorId) {
                    return { success: false, message: "userId is required" };
                }
                const doctor = yield this.adminRepository.deleteDoctor(doctorId);
                if (!doctor) {
                    return { success: false, message: "User not found or error fetching data" };
                }
                return { success: true, message: "User block status fetched successfully" };
            }
            catch (error) {
                console.log("Error in user service", error.message);
                return { success: false, message: `Error: ${error.message}` };
            }
        });
        this.getAppoinments = (admin) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!admin) {
                    return null;
                }
                const appointments = yield this.adminRepository.getAppoinments(admin);
                if (!appointments) {
                    return null;
                }
                return appointments;
            }
            catch (error) {
                console.log("Error in user service:", error.message);
                return null;
            }
        });
        this.getReviews = (admin) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!admin) {
                    console.warn("Admin identifier is required but not provided.");
                    return null;
                }
                const reviews = yield this.adminRepository.getReviews(admin);
                if (!reviews) {
                    console.info(`No reviews found for admin: ${admin}`);
                    return null;
                }
                return reviews;
            }
            catch (error) {
                console.error("Error in getReviews service:", error.message);
                return null; // Or rethrow the error with `throw error;` if needed
            }
        });
        this.deleteReviews = (review) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!review) {
                    return { success: false, message: "reviewId is required" };
                }
                const users = yield this.adminRepository.deleteReviews(review);
                if (!users) {
                    return { success: false, message: "User not found or error fetching data" };
                }
                return { success: true, message: "User block status fetched successfully" };
            }
            catch (error) {
                console.log("Error in user service", error.message);
                return { success: false, message: `Error: ${error.message}` }; // Return error message
            }
        });
        this.adminRepository = adminRepository;
    }
}
exports.AdminService = AdminService;

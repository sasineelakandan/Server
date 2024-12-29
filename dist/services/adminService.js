import { ADMIN_EMAIL, ADMIN_PASSWORD } from "../utils/constant";
import { generateAccessToken, generateRefreshToken, } from "../utils/generateJWT";
export class AdminService {
    constructor(adminRepository) {
        this.adminLogin = async (email, password) => {
            try {
                const envEmail = ADMIN_EMAIL;
                const envPassword = ADMIN_PASSWORD;
                if (!envEmail || !envPassword) {
                    throw new Error("Environment variables for email or password are not set");
                }
                if (email === envEmail && password === envPassword) {
                    const accessToken = generateAccessToken(envEmail, "admin");
                    const refreshToken = generateRefreshToken(envEmail, "admin");
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
        };
        this.patientDetails = async (admin) => {
            try {
                if (!admin) {
                    // If no admin identifier is provided, return null or an empty object
                    return null;
                }
                // Fetch patient details from the repository
                const users = await this.adminRepository.patientDetails(admin);
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
        };
        this.isBlocked = async (email, userId) => {
            try {
                if (!email) {
                    return { success: false, message: "Email is required" };
                }
                const users = await this.adminRepository.isBlocked(email, userId);
                if (!users) {
                    return { success: false, message: "User not found or error fetching data" };
                }
                return { success: true, message: "User block status fetched successfully" };
            }
            catch (error) {
                console.log("Error in user service", error.message);
                return { success: false, message: `Error: ${error.message}` }; // Return error message
            }
        };
        this.isDelete = async (userId) => {
            try {
                if (!userId) {
                    return { success: false, message: "userId is required" };
                }
                const users = await this.adminRepository.isDelete(userId);
                if (!users) {
                    return { success: false, message: "User not found or error fetching data" };
                }
                return { success: true, message: "User block status fetched successfully" };
            }
            catch (error) {
                console.log("Error in user service", error.message);
                return { success: false, message: `Error: ${error.message}` }; // Return error message
            }
        };
        this.isVerify = async (userId) => {
            try {
                if (!userId) {
                    return { success: false, message: "userId is required" };
                }
                const users = await this.adminRepository.isVerify(userId);
                if (!users) {
                    return { success: false, message: "User not found or error fetching data" };
                }
                return { success: true, message: "User block status fetched successfully" };
            }
            catch (error) {
                console.log("Error in user service", error.message);
                return { success: false, message: `Error: ${error.message}` }; // Return error message
            }
        };
        this.doctorDetails = async (admin) => {
            try {
                if (!admin) {
                    return null;
                }
                const doctors = await this.adminRepository.doctorDetails(admin);
                if (!doctors) {
                    return null;
                }
                return doctors;
            }
            catch (error) {
                console.log("Error in user service:", error.message);
                return null;
            }
        };
        this.verifiedDoctors = async (admin) => {
            try {
                if (!admin) {
                    return null;
                }
                const doctors = await this.adminRepository.verifiedDoctors(admin);
                if (!doctors) {
                    return null;
                }
                return doctors;
            }
            catch (error) {
                console.log("Error in user service:", error.message);
                return null;
            }
        };
        this.doctorBlock = async (doctorId) => {
            try {
                const users = await this.adminRepository.doctorBlock(doctorId);
                if (!users) {
                    return { success: false, message: "User not found or error fetching data" };
                }
                return { success: true, message: "User block status fetched successfully" };
            }
            catch (error) {
                console.log("Error in user service", error.message);
                return { success: false, message: `Error: ${error.message}` }; // Return error message
            }
        };
        this.deleteDoctor = async (doctorId) => {
            try {
                if (!doctorId) {
                    return { success: false, message: "userId is required" };
                }
                const doctor = await this.adminRepository.deleteDoctor(doctorId);
                if (!doctor) {
                    return { success: false, message: "User not found or error fetching data" };
                }
                return { success: true, message: "User block status fetched successfully" };
            }
            catch (error) {
                console.log("Error in user service", error.message);
                return { success: false, message: `Error: ${error.message}` };
            }
        };
        this.getAppoinments = async (admin) => {
            try {
                if (!admin) {
                    return null;
                }
                const appointments = await this.adminRepository.getAppoinments(admin);
                if (!appointments) {
                    return null;
                }
                return appointments;
            }
            catch (error) {
                console.log("Error in user service:", error.message);
                return null;
            }
        };
        this.getReviews = async (admin) => {
            try {
                if (!admin) {
                    console.warn("Admin identifier is required but not provided.");
                    return null;
                }
                const reviews = await this.adminRepository.getReviews(admin);
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
        };
        this.deleteReviews = async (review) => {
            try {
                if (!review) {
                    return { success: false, message: "reviewId is required" };
                }
                const users = await this.adminRepository.deleteReviews(review);
                if (!users) {
                    return { success: false, message: "User not found or error fetching data" };
                }
                return { success: true, message: "User block status fetched successfully" };
            }
            catch (error) {
                console.log("Error in user service", error.message);
                return { success: false, message: `Error: ${error.message}` }; // Return error message
            }
        };
        this.adminRepository = adminRepository;
    }
}

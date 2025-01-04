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
exports.DoctorController = void 0;
const saveOtp_1 = __importDefault(require("../midlewere/otpservice/doctor/saveOtp"));
class DoctorController {
    constructor(doctorService) {
        this.doctorSignup = (httpRequest) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, password, phone, specialization, experience, location } = httpRequest.body;
                console.log(location);
                const doctor = yield this.doctorService.doctorSignup({
                    name,
                    email,
                    phone,
                    password,
                    specialization,
                    experience,
                    location
                });
                const { accessToken, refreshToken } = doctor;
                const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
                const userId = doctor._id.toString();
                yield this.otpService.saveOtp({ userId, generatedOtp }, email);
                return {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    statusCode: 201,
                    body: Object.assign(Object.assign({}, doctor), { accessToken, refreshToken }),
                };
            }
            catch (e) {
                console.error("Error in userSignup:", e);
                return {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    statusCode: e.statusCode || 500,
                    body: {
                        error: e.message || "An unexpected error occurred",
                    },
                };
            }
        });
        this.verifyOtp = (httpRequest) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(httpRequest);
                const { userId, otp } = httpRequest.body;
                console.log(userId);
                const savedOtp = yield this.doctorService.verifyOtp({ userId, otp });
                return {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    statusCode: 201,
                    body: Object.assign({}, savedOtp),
                };
            }
            catch (e) {
                console.error("Error in userSignup:", e);
                return {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    statusCode: e.statusCode || 500,
                    body: {
                        error: e.message || "An unexpected error occurred",
                    },
                };
            }
        });
        this.resendOtp = (httpRequest) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(httpRequest);
                const { userId } = httpRequest.body;
                yield this.otpService.resendOtp(userId);
                return {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    statusCode: 201,
                    body: { message: 'resendOtp successfull' },
                };
            }
            catch (error) {
                console.log("Error in resend otp", error.message);
                throw new Error(error.message);
            }
        });
        this.doctorLogin = (httpRequest) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = httpRequest.body;
                const user = yield this.doctorService.doctorLogin(email, password);
                return {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    statusCode: 201,
                    body: Object.assign({}, user),
                };
            }
            catch (e) {
                console.log(e);
                return {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    statusCode: e.statusCode || 500,
                    body: {
                        error: e.message,
                    },
                };
            }
        });
        this.doctorProfile = (httpRequest) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.user) === null || _a === void 0 ? void 0 : _a.id;
                if (!userId) {
                    console.error("User ID not found");
                    throw new Error("User ID is required to fetch the doctor profile.");
                }
                const doctor = yield this.doctorService.doctorProfile(userId);
                return {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    statusCode: 200,
                    body: Object.assign({}, doctor),
                };
            }
            catch (error) {
                console.error("Error in doctorProfile:", error.message);
                return {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    statusCode: 500, // Internal Server Error
                    body: { error: error.message || "An unknown error occurred." },
                };
            }
        });
        this.verifyProfile = (httpRequest) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.user) === null || _a === void 0 ? void 0 : _a.id;
                const formData = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.body;
                if (userId) {
                    const doctor = yield this.doctorService.updateProfile(Object.assign({}, formData), userId);
                    return {
                        headers: {
                            "Content-Type": "application/json",
                        },
                        statusCode: 201,
                        body: Object.assign({}, doctor),
                    };
                }
                else {
                    console.error("User ID not found");
                    throw new Error("User ID is required to fetch doctor profile.");
                }
            }
            catch (error) {
                console.log("Error in verify", error.message);
                return {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    statusCode: 500,
                    body: { message: "Internal server error", error: error.message },
                };
            }
        });
        this.changeProfile = (httpRequest) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.user) === null || _a === void 0 ? void 0 : _a.id;
                const formData = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.body;
                if (userId) {
                    const doctor = yield this.doctorService.changeProfile(userId, Object.assign({}, formData));
                    return {
                        headers: {
                            "Content-Type": "application/json",
                        },
                        statusCode: 201,
                        body: Object.assign({}, doctor),
                    };
                }
                else {
                    console.error("User ID not found");
                    throw new Error("User ID is required to fetch doctor profile.");
                }
            }
            catch (error) {
                console.log("Error in verify", error.message);
                return {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    statusCode: 500,
                    body: { message: "Internal server error", error: error.message },
                };
            }
        });
        this.changePassword = (httpRequest) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.user) === null || _a === void 0 ? void 0 : _a.id;
                const { oldPassword, newPassword } = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.body;
                if (!userId) {
                    console.error('User ID not found');
                    throw new Error('User ID is required to fetch the profile.');
                }
                const user = yield this.doctorService.changePassword(userId, oldPassword, newPassword);
                return {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    statusCode: 201,
                    body: Object.assign({}, user),
                };
            }
            catch (error) {
                console.error('Error in userProfile:', error.message);
                return {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    statusCode: 500,
                    body: { error: error.message || 'An unknown error occurred.' },
                };
            }
        });
        this.getAppointments = (httpRequest) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const doctorId = (_a = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.user) === null || _a === void 0 ? void 0 : _a.id;
                if (!doctorId) {
                    console.error('User ID not found');
                    throw new Error('User ID is required to fetch the profile.');
                }
                const appointment = yield this.doctorService.getAppointments(doctorId);
                return {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    statusCode: 201,
                    body: appointment,
                };
            }
            catch (error) {
                console.error('Error in userProfile:', error.message);
                return {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    statusCode: 500,
                    body: { error: error.message || 'An unknown error occurred.' },
                };
            }
        });
        this.resheduleAppointment = (httpRequest) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const doctorId = (_a = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.user) === null || _a === void 0 ? void 0 : _a.id;
                const payloadData = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.body;
                if (!doctorId) {
                    console.error('User ID not found');
                    throw new Error('User ID is required to fetch the profile.');
                }
                const appointment = yield this.doctorService.resheduleAppointment(doctorId, payloadData);
                return {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    statusCode: 201,
                    body: appointment,
                };
            }
            catch (error) {
                console.error('Error in userProfile:', error.message);
                return {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    statusCode: 500,
                    body: { error: error.message || 'An unknown error occurred.' },
                };
            }
        });
        this.completeAppointment = (httpRequest) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const doctorId = (_a = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.user) === null || _a === void 0 ? void 0 : _a.id;
                const { appointmentId } = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.body;
                if (!doctorId) {
                    console.error('User ID not found');
                    throw new Error('User ID is required to fetch the profile.');
                }
                const appointment = yield this.doctorService.completeAppointment(doctorId, appointmentId);
                return {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    statusCode: 201,
                    body: appointment,
                };
            }
            catch (error) {
                console.error('Error in userProfile:', error.message);
                return {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    statusCode: 500,
                    body: { error: error.message || 'An unknown error occurred.' },
                };
            }
        });
        this.cancelAppointment = (httpRequest) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const doctorId = (_a = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.user) === null || _a === void 0 ? void 0 : _a.id;
                const { appointmentId } = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.body;
                console.log(appointmentId);
                if (!doctorId) {
                    console.error('User ID not found');
                    throw new Error('User ID is required to fetch the profile.');
                }
                const appointment = yield this.doctorService.cancelAppointment(doctorId, appointmentId);
                return {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    statusCode: 201,
                    body: appointment,
                };
            }
            catch (error) {
                console.error('Error in userProfile:', error.message);
                return {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    statusCode: 500,
                    body: { error: error.message || 'An unknown error occurred.' },
                };
            }
        });
        this.updateProfilepic = (httpRequest) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                console.log(httpRequest);
                const doctorId = (_a = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.user) === null || _a === void 0 ? void 0 : _a.id;
                const uploadedUrl = (_b = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.body) === null || _b === void 0 ? void 0 : _b.uploadedUrl;
                console.log(uploadedUrl);
                if (!uploadedUrl) {
                    throw new Error('Profile picture URL is required.');
                }
                if (!doctorId) {
                    console.error('User ID not found in the request.');
                    throw new Error('Doctor ID is required to update the profile.');
                }
                const updatedProfile = yield this.doctorService.updateProfilepic(doctorId, uploadedUrl);
                return {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    statusCode: 201, // Created
                    body: { message: "Profile picture updated successfully.", data: updatedProfile },
                };
            }
            catch (error) {
                console.error('Error in updateProfilePic:', error.message);
                const statusCode = error.message.includes('required') ? 400 : 500; // Client or server error
                return {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    statusCode,
                    body: { error: error.message || 'An unknown error occurred.' },
                };
            }
        });
        this.chatwithUser = (httpRequest) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const doctorId = (_a = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.user) === null || _a === void 0 ? void 0 : _a.id;
                const { apptId } = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.body;
                if (!apptId) {
                    throw new Error('Profile picture URL is required.');
                }
                if (!doctorId) {
                    console.error('User ID not found in the request.');
                    throw new Error('Doctor ID is required to update the profile.');
                }
                const updatedProfile = yield this.doctorService.chatwithUser(doctorId, apptId);
                return {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    statusCode: 201, // Created
                    body: { message: "Profile picture updated successfully.", data: updatedProfile },
                };
            }
            catch (error) {
                console.error('Error in updateProfilePic:', error.message);
                const statusCode = error.message.includes('required') ? 400 : 500; // Client or server error
                return {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    statusCode,
                    body: { error: error.message || 'An unknown error occurred.' },
                };
            }
        });
        this.sendMessage = (httpRequest) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const doctorId = (_a = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.user) === null || _a === void 0 ? void 0 : _a.id;
                const { activeUser, message } = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.body;
                if (!activeUser) {
                    throw new Error('Profile picture URL is required.');
                }
                if (!doctorId) {
                    console.error('User ID not found in the request.');
                    throw new Error('Doctor ID is required to update the profile.');
                }
                const createmessage = yield this.doctorService.sendMessage(activeUser, message);
                return {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    statusCode: 201,
                    body: { message: "Msg send  successfully.", data: createmessage },
                };
            }
            catch (error) {
                console.error('Error in updateProfilePic:', error.message);
                const statusCode = error.message.includes('required') ? 400 : 500;
                return {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    statusCode,
                    body: { error: error.message || 'An unknown error occurred.' },
                };
            }
        });
        this.getMessages = (httpRequest) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const roomId = (_a = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.query) === null || _a === void 0 ? void 0 : _a.roomId;
                if (!roomId || typeof roomId !== 'string') {
                    console.error('Invalid room ID');
                    throw new Error('Room ID is required and must be a string.');
                }
                const messages = yield this.doctorService.getMessage(roomId);
                console.log(messages);
                return {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    statusCode: 200,
                    body: messages,
                };
            }
            catch (error) {
                console.error('Error in getMessages:', error.message);
                return {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    statusCode: 500, // Internal Server Error
                    body: { error: error.message || 'An unknown error occurred.' },
                };
            }
        });
        this.getChatMembers = (httpRequest) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const doctorId = (_a = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.user) === null || _a === void 0 ? void 0 : _a.id;
                if (!doctorId || typeof doctorId !== 'string') {
                    console.error('Invalid room ID');
                    throw new Error('Room ID is required and must be a string.');
                }
                const messages = yield this.doctorService.getChatMembers(doctorId);
                return {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    statusCode: 200,
                    body: messages,
                };
            }
            catch (error) {
                console.error('Error in getMessages:', error.message);
                return {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    statusCode: 500, // Internal Server Error
                    body: { error: error.message || 'An unknown error occurred.' },
                };
            }
        });
        this.forgotPasswordOtp = (httpRequest) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const email = (_a = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.body) === null || _a === void 0 ? void 0 : _a.email;
                if (!email || typeof email !== 'string') {
                    console.error('Invalid room ID');
                    throw new Error('email is required and must be a string.');
                }
                const otp = yield this.doctorService.forgotPasswordOtp(email);
                const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
                const userId = otp.status;
                yield this.otpService.saveOtp({ userId, generatedOtp }, email);
                return {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    statusCode: 200,
                    body: otp,
                };
            }
            catch (error) {
                console.error('Error in getMessages:', error.message);
                return {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    statusCode: 500, // Internal Server Error
                    body: { error: error.message || 'An unknown error occurred.' },
                };
            }
        });
        this.forgotPassword = (httpRequest) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(httpRequest);
                const { userId, otp, password } = httpRequest.body;
                const savedOtp = yield this.doctorService.forgotPassword({ userId, otp, password });
                return {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    statusCode: 201,
                    body: Object.assign({}, savedOtp),
                };
            }
            catch (e) {
                console.error("Error in userSignup:", e);
                return {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    statusCode: e.statusCode || 500,
                    body: {
                        error: e.message || "An unexpected error occurred",
                    },
                };
            }
        });
        this.createSlots = (httpRequest) => __awaiter(this, void 0, void 0, function* () {
            try {
                const slotData = httpRequest.body;
                const doctorId = httpRequest.body.doctorId;
                if (!doctorId) {
                    throw new Error('Doctor ID is missing or not authorized.');
                }
                // Assuming createSlots method in doctorService takes doctorId and slotData
                const response = yield this.doctorService.createSlots(doctorId, slotData);
                return {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    statusCode: 201, // Created
                    body: response,
                };
            }
            catch (e) {
                console.error("Error in createSlots:", e);
                // Handling known error or unexpected error
                const statusCode = e.statusCode || 500;
                const errorMessage = e.message || "An unexpected error occurred";
                return {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    statusCode,
                    body: {
                        error: errorMessage,
                    },
                };
            }
        });
        this.doctorService = doctorService;
        this.otpService = new saveOtp_1.default();
    }
}
exports.DoctorController = DoctorController;

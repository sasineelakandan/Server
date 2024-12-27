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
exports.UserController = void 0;
const saveOtp_1 = __importDefault(require("../midlewere/otpservice/user/saveOtp"));
class UserController {
    constructor(userService) {
        this.userSignup = (httpRequest) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, email, phone, password } = httpRequest.body;
                const user = yield this.userService.userSignup({
                    username,
                    email,
                    phone,
                    password,
                });
                const { accessToken, refreshToken } = user;
                const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
                const userId = user._id.toString();
                const useremail = email;
                yield this.otpService.saveOtp({ userId, generatedOtp }, email);
                return {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    statusCode: 201,
                    body: Object.assign(Object.assign({}, user), { accessToken, refreshToken }),
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
                const { userId, otp } = httpRequest.body;
                console.log(userId);
                const savedOtp = yield this.userService.verifyOtp({ userId, otp });
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
        this.userLogin = (httpRequest) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = httpRequest.body;
                const user = yield this.userService.userLogin(email, password);
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
        this.userProfile = (httpRequest) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.user) === null || _a === void 0 ? void 0 : _a.id;
                if (!userId) {
                    console.error('User ID not found');
                    throw new Error('User ID is required to fetch the profile.');
                }
                const user = yield this.userService.userProfile(userId);
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
        this.changeProfile = (httpRequest) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.user) === null || _a === void 0 ? void 0 : _a.id;
                const { name, phone } = httpRequest.body;
                console.log(name, phone);
                if (!userId) {
                    console.error('User ID not found');
                    throw new Error('User ID is required to fetch the profile.');
                }
                const user = yield this.userService.changeProfile(userId, name, phone);
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
        this.changePassword = (httpRequest) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.user) === null || _a === void 0 ? void 0 : _a.id;
                const { oldPassword, newPassword } = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.body;
                if (!userId) {
                    console.error('User ID not found');
                    throw new Error('User ID is required to fetch the profile.');
                }
                const user = yield this.userService.changePassword(userId, oldPassword, newPassword);
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
                const userId = (_a = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.user) === null || _a === void 0 ? void 0 : _a.id;
                if (!userId) {
                    console.error('User ID not found');
                    throw new Error('User ID is required to fetch the profile.');
                }
                const appointment = yield this.userService.getAppointments(userId);
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
        this.cancelAppointments = (httpRequest) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.user) === null || _a === void 0 ? void 0 : _a.id;
                const { appointmentId } = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.body;
                if (!userId) {
                    console.error('User ID not found');
                    throw new Error('User ID is required to fetch the profile.');
                }
                const appointment = yield this.userService.cancelAppointments(userId, appointmentId);
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
                const userId = (_a = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.user) === null || _a === void 0 ? void 0 : _a.id;
                const uploadedUrl = (_b = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.body) === null || _b === void 0 ? void 0 : _b.uploadedUrl;
                console.log(uploadedUrl);
                if (!uploadedUrl) {
                    throw new Error('Profile picture URL is required.');
                }
                if (!userId) {
                    console.error('User ID not found in the request.');
                    throw new Error('Doctor ID is required to update the profile.');
                }
                const updatedProfile = yield this.userService.updateProfilePic(userId, uploadedUrl);
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
        this.chatwithDoctor = (httpRequest) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.user) === null || _a === void 0 ? void 0 : _a.id;
                const { apptId } = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.body;
                if (!apptId) {
                    throw new Error('Profile picture URL is required.');
                }
                if (!userId) {
                    console.error('User ID not found in the request.');
                    throw new Error('Doctor ID is required to update the profile.');
                }
                const updatedProfile = yield this.userService.chatwithDoctor(userId, apptId);
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
                const userId = (_a = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.user) === null || _a === void 0 ? void 0 : _a.id;
                const { activeUser, message } = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.body;
                if (!activeUser) {
                    throw new Error('Profile picture URL is required.');
                }
                if (!userId) {
                    console.error('User ID not found in the request.');
                    throw new Error('Doctor ID is required to update the profile.');
                }
                const createmessage = yield this.userService.sendMessage(activeUser, message);
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
                const messages = yield this.userService.getMessage(roomId);
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
                const userId = (_a = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.user) === null || _a === void 0 ? void 0 : _a.id;
                if (!userId || typeof userId !== 'string') {
                    console.error('Invalid room ID');
                    throw new Error('Room ID is required and must be a string.');
                }
                const messages = yield this.userService.getChatMembers(userId);
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
        this.slotAssign = (httpRequest) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.user) === null || _a === void 0 ? void 0 : _a.id;
                const slotData = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.body;
                console.log(slotData);
                if (!userId) {
                    console.error('User ID not found');
                    throw new Error('User ID is required to fetch the profile.');
                }
                const user = yield this.userService.slotAsign(userId, slotData);
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
        this.getcompleteAppointment = (httpRequest) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.user) === null || _a === void 0 ? void 0 : _a.id;
                if (!userId) {
                    console.error('User ID not found');
                    throw new Error('User ID is required to fetch the profile.');
                }
                const appointments = yield this.userService.getcompleteAppointment(userId);
                return {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    statusCode: 201,
                    body: appointments
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
        this.userReview = (httpRequest) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.user) === null || _a === void 0 ? void 0 : _a.id;
                const review = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.body;
                if (!userId) {
                    console.error('User ID not found');
                    throw new Error('User ID is required to fetch the profile.');
                }
                const appointments = yield this.userService.userReview(userId, review);
                return {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    statusCode: 201,
                    body: appointments
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
        this.googleLogin = (httpRequest) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { displayName, email, photoURL } = httpRequest.body;
                const user = yield this.userService.googleLogin({
                    displayName,
                    email,
                    photoURL
                });
                const { accessToken, refreshToken } = user;
                const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
                const userId = user._id.toString();
                const useremail = email;
                yield this.otpService.saveOtp({ userId, generatedOtp }, email);
                return {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    statusCode: 201,
                    body: Object.assign(Object.assign({}, user), { accessToken, refreshToken }),
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
        this.getReview = (httpRequest) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const doctorId = (_a = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.query) === null || _a === void 0 ? void 0 : _a.doctorId;
                if (typeof doctorId !== 'string') {
                    throw new Error('doctorId must be a valid string.');
                }
                if (!doctorId) {
                    console.error('User ID not found');
                    throw new Error('User ID is required to fetch the profile.');
                }
                const reviewDatas = yield this.userService.getReview(doctorId);
                return {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    statusCode: 201,
                    body: reviewDatas
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
        this.userService = userService;
        this.otpService = new saveOtp_1.default();
    }
}
exports.UserController = UserController;

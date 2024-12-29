"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
var saveOtp_1 = __importDefault(require("../midlewere/otpservice/user/saveOtp"));
var UserController = /** @class */ (function () {
    function UserController(userService) {
        var _this = this;
        this.userSignup = function (httpRequest) { return __awaiter(_this, void 0, void 0, function () {
            var _a, username, email, phone, password, user, accessToken, refreshToken, generatedOtp, userId, useremail, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        _a = httpRequest.body, username = _a.username, email = _a.email, phone = _a.phone, password = _a.password;
                        return [4 /*yield*/, this.userService.userSignup({
                                username: username,
                                email: email,
                                phone: phone,
                                password: password,
                            })];
                    case 1:
                        user = _b.sent();
                        accessToken = user.accessToken, refreshToken = user.refreshToken;
                        generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
                        userId = user._id.toString();
                        useremail = email;
                        return [4 /*yield*/, this.otpService.saveOtp({ userId: userId, generatedOtp: generatedOtp }, email)];
                    case 2:
                        _b.sent();
                        return [2 /*return*/, {
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                statusCode: 201,
                                body: __assign(__assign({}, user), { accessToken: accessToken, refreshToken: refreshToken }),
                            }];
                    case 3:
                        e_1 = _b.sent();
                        console.error("Error in userSignup:", e_1);
                        return [2 /*return*/, {
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                statusCode: e_1.statusCode || 500,
                                body: {
                                    error: e_1.message || "An unexpected error occurred",
                                },
                            }];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.verifyOtp = function (httpRequest) { return __awaiter(_this, void 0, void 0, function () {
            var _a, userId, otp, savedOtp, e_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = httpRequest.body, userId = _a.userId, otp = _a.otp;
                        console.log(userId);
                        return [4 /*yield*/, this.userService.verifyOtp({ userId: userId, otp: otp })];
                    case 1:
                        savedOtp = _b.sent();
                        return [2 /*return*/, {
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                statusCode: 201,
                                body: __assign({}, savedOtp),
                            }];
                    case 2:
                        e_2 = _b.sent();
                        console.error("Error in userSignup:", e_2);
                        return [2 /*return*/, {
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                statusCode: e_2.statusCode || 500,
                                body: {
                                    error: e_2.message || "An unexpected error occurred",
                                },
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.resendOtp = function (httpRequest) { return __awaiter(_this, void 0, void 0, function () {
            var userId, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        console.log(httpRequest);
                        userId = httpRequest.body.userId;
                        return [4 /*yield*/, this.otpService.resendOtp(userId)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, {
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                statusCode: 201,
                                body: { message: 'resendOtp successfull' },
                            }];
                    case 2:
                        error_1 = _a.sent();
                        console.log("Error in resend otp", error_1.message);
                        throw new Error(error_1.message);
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.userLogin = function (httpRequest) { return __awaiter(_this, void 0, void 0, function () {
            var _a, email, password, user, e_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = httpRequest.body, email = _a.email, password = _a.password;
                        return [4 /*yield*/, this.userService.userLogin(email, password)];
                    case 1:
                        user = _b.sent();
                        return [2 /*return*/, {
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                statusCode: 201,
                                body: __assign({}, user),
                            }];
                    case 2:
                        e_3 = _b.sent();
                        console.log(e_3);
                        return [2 /*return*/, {
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                statusCode: e_3.statusCode || 500,
                                body: {
                                    error: e_3.message,
                                },
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.userProfile = function (httpRequest) { return __awaiter(_this, void 0, void 0, function () {
            var userId, user, error_2;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        userId = (_a = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.user) === null || _a === void 0 ? void 0 : _a.id;
                        if (!userId) {
                            console.error('User ID not found');
                            throw new Error('User ID is required to fetch the profile.');
                        }
                        return [4 /*yield*/, this.userService.userProfile(userId)];
                    case 1:
                        user = _b.sent();
                        return [2 /*return*/, {
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                statusCode: 201,
                                body: __assign({}, user),
                            }];
                    case 2:
                        error_2 = _b.sent();
                        console.error('Error in userProfile:', error_2.message);
                        return [2 /*return*/, {
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                statusCode: 500,
                                body: { error: error_2.message || 'An unknown error occurred.' },
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.changeProfile = function (httpRequest) { return __awaiter(_this, void 0, void 0, function () {
            var userId, _a, name_1, phone, user, error_3;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        userId = (_b = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.user) === null || _b === void 0 ? void 0 : _b.id;
                        _a = httpRequest.body, name_1 = _a.name, phone = _a.phone;
                        console.log(name_1, phone);
                        if (!userId) {
                            console.error('User ID not found');
                            throw new Error('User ID is required to fetch the profile.');
                        }
                        return [4 /*yield*/, this.userService.changeProfile(userId, name_1, phone)];
                    case 1:
                        user = _c.sent();
                        return [2 /*return*/, {
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                statusCode: 201,
                                body: __assign({}, user),
                            }];
                    case 2:
                        error_3 = _c.sent();
                        console.error('Error in userProfile:', error_3.message);
                        return [2 /*return*/, {
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                statusCode: 500,
                                body: { error: error_3.message || 'An unknown error occurred.' },
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.changePassword = function (httpRequest) { return __awaiter(_this, void 0, void 0, function () {
            var userId, _a, oldPassword, newPassword, user, error_4;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        userId = (_b = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.user) === null || _b === void 0 ? void 0 : _b.id;
                        _a = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.body, oldPassword = _a.oldPassword, newPassword = _a.newPassword;
                        if (!userId) {
                            console.error('User ID not found');
                            throw new Error('User ID is required to fetch the profile.');
                        }
                        return [4 /*yield*/, this.userService.changePassword(userId, oldPassword, newPassword)];
                    case 1:
                        user = _c.sent();
                        return [2 /*return*/, {
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                statusCode: 201,
                                body: __assign({}, user),
                            }];
                    case 2:
                        error_4 = _c.sent();
                        console.error('Error in userProfile:', error_4.message);
                        return [2 /*return*/, {
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                statusCode: 500,
                                body: { error: error_4.message || 'An unknown error occurred.' },
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getAppointments = function (httpRequest) { return __awaiter(_this, void 0, void 0, function () {
            var userId, appointment, error_5;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        userId = (_a = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.user) === null || _a === void 0 ? void 0 : _a.id;
                        if (!userId) {
                            console.error('User ID not found');
                            throw new Error('User ID is required to fetch the profile.');
                        }
                        return [4 /*yield*/, this.userService.getAppointments(userId)];
                    case 1:
                        appointment = _b.sent();
                        return [2 /*return*/, {
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                statusCode: 201,
                                body: appointment,
                            }];
                    case 2:
                        error_5 = _b.sent();
                        console.error('Error in userProfile:', error_5.message);
                        return [2 /*return*/, {
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                statusCode: 500,
                                body: { error: error_5.message || 'An unknown error occurred.' },
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.cancelAppointments = function (httpRequest) { return __awaiter(_this, void 0, void 0, function () {
            var userId, appointmentId, appointment, error_6;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        userId = (_a = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.user) === null || _a === void 0 ? void 0 : _a.id;
                        appointmentId = (httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.body).appointmentId;
                        if (!userId) {
                            console.error('User ID not found');
                            throw new Error('User ID is required to fetch the profile.');
                        }
                        return [4 /*yield*/, this.userService.cancelAppointments(userId, appointmentId)];
                    case 1:
                        appointment = _b.sent();
                        return [2 /*return*/, {
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                statusCode: 201,
                                body: appointment,
                            }];
                    case 2:
                        error_6 = _b.sent();
                        console.error('Error in userProfile:', error_6.message);
                        return [2 /*return*/, {
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                statusCode: 500,
                                body: { error: error_6.message || 'An unknown error occurred.' },
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.updateProfilepic = function (httpRequest) { return __awaiter(_this, void 0, void 0, function () {
            var userId, uploadedUrl, updatedProfile, error_7, statusCode;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        userId = (_a = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.user) === null || _a === void 0 ? void 0 : _a.id;
                        uploadedUrl = (_b = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.body) === null || _b === void 0 ? void 0 : _b.uploadedUrl;
                        console.log(uploadedUrl);
                        if (!uploadedUrl) {
                            throw new Error('Profile picture URL is required.');
                        }
                        if (!userId) {
                            console.error('User ID not found in the request.');
                            throw new Error('Doctor ID is required to update the profile.');
                        }
                        return [4 /*yield*/, this.userService.updateProfilePic(userId, uploadedUrl)];
                    case 1:
                        updatedProfile = _c.sent();
                        return [2 /*return*/, {
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                statusCode: 201, // Created
                                body: { message: "Profile picture updated successfully.", data: updatedProfile },
                            }];
                    case 2:
                        error_7 = _c.sent();
                        console.error('Error in updateProfilePic:', error_7.message);
                        statusCode = error_7.message.includes('required') ? 400 : 500;
                        return [2 /*return*/, {
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                statusCode: statusCode,
                                body: { error: error_7.message || 'An unknown error occurred.' },
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.chatwithDoctor = function (httpRequest) { return __awaiter(_this, void 0, void 0, function () {
            var userId, apptId, updatedProfile, error_8, statusCode;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        userId = (_a = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.user) === null || _a === void 0 ? void 0 : _a.id;
                        apptId = (httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.body).apptId;
                        if (!apptId) {
                            throw new Error('Profile picture URL is required.');
                        }
                        if (!userId) {
                            console.error('User ID not found in the request.');
                            throw new Error('Doctor ID is required to update the profile.');
                        }
                        return [4 /*yield*/, this.userService.chatwithDoctor(userId, apptId)];
                    case 1:
                        updatedProfile = _b.sent();
                        return [2 /*return*/, {
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                statusCode: 201, // Created
                                body: { message: "Profile picture updated successfully.", data: updatedProfile },
                            }];
                    case 2:
                        error_8 = _b.sent();
                        console.error('Error in updateProfilePic:', error_8.message);
                        statusCode = error_8.message.includes('required') ? 400 : 500;
                        return [2 /*return*/, {
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                statusCode: statusCode,
                                body: { error: error_8.message || 'An unknown error occurred.' },
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.sendMessage = function (httpRequest) { return __awaiter(_this, void 0, void 0, function () {
            var userId, _a, activeUser, message, createmessage, error_9, statusCode;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        userId = (_b = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.user) === null || _b === void 0 ? void 0 : _b.id;
                        _a = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.body, activeUser = _a.activeUser, message = _a.message;
                        if (!activeUser) {
                            throw new Error('Profile picture URL is required.');
                        }
                        if (!userId) {
                            console.error('User ID not found in the request.');
                            throw new Error('Doctor ID is required to update the profile.');
                        }
                        return [4 /*yield*/, this.userService.sendMessage(activeUser, message)];
                    case 1:
                        createmessage = _c.sent();
                        return [2 /*return*/, {
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                statusCode: 201,
                                body: { message: "Msg send  successfully.", data: createmessage },
                            }];
                    case 2:
                        error_9 = _c.sent();
                        console.error('Error in updateProfilePic:', error_9.message);
                        statusCode = error_9.message.includes('required') ? 400 : 500;
                        return [2 /*return*/, {
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                statusCode: statusCode,
                                body: { error: error_9.message || 'An unknown error occurred.' },
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getMessages = function (httpRequest) { return __awaiter(_this, void 0, void 0, function () {
            var roomId, messages, error_10;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        roomId = (_a = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.query) === null || _a === void 0 ? void 0 : _a.roomId;
                        if (!roomId || typeof roomId !== 'string') {
                            console.error('Invalid room ID');
                            throw new Error('Room ID is required and must be a string.');
                        }
                        return [4 /*yield*/, this.userService.getMessage(roomId)];
                    case 1:
                        messages = _b.sent();
                        console.log(messages);
                        return [2 /*return*/, {
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                statusCode: 200,
                                body: messages,
                            }];
                    case 2:
                        error_10 = _b.sent();
                        console.error('Error in getMessages:', error_10.message);
                        return [2 /*return*/, {
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                statusCode: 500, // Internal Server Error
                                body: { error: error_10.message || 'An unknown error occurred.' },
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getChatMembers = function (httpRequest) { return __awaiter(_this, void 0, void 0, function () {
            var userId, messages, error_11;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        userId = (_a = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.user) === null || _a === void 0 ? void 0 : _a.id;
                        if (!userId || typeof userId !== 'string') {
                            console.error('Invalid room ID');
                            throw new Error('Room ID is required and must be a string.');
                        }
                        return [4 /*yield*/, this.userService.getChatMembers(userId)];
                    case 1:
                        messages = _b.sent();
                        return [2 /*return*/, {
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                statusCode: 200,
                                body: messages,
                            }];
                    case 2:
                        error_11 = _b.sent();
                        console.error('Error in getMessages:', error_11.message);
                        return [2 /*return*/, {
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                statusCode: 500, // Internal Server Error
                                body: { error: error_11.message || 'An unknown error occurred.' },
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.slotAssign = function (httpRequest) { return __awaiter(_this, void 0, void 0, function () {
            var userId, slotData, user, error_12;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        userId = (_a = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.user) === null || _a === void 0 ? void 0 : _a.id;
                        slotData = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.body;
                        console.log(slotData);
                        if (!userId) {
                            console.error('User ID not found');
                            throw new Error('User ID is required to fetch the profile.');
                        }
                        return [4 /*yield*/, this.userService.slotAsign(userId, slotData)];
                    case 1:
                        user = _b.sent();
                        return [2 /*return*/, {
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                statusCode: 201,
                                body: __assign({}, user),
                            }];
                    case 2:
                        error_12 = _b.sent();
                        console.error('Error in userProfile:', error_12.message);
                        return [2 /*return*/, {
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                statusCode: 500,
                                body: { error: error_12.message || 'An unknown error occurred.' },
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getcompleteAppointment = function (httpRequest) { return __awaiter(_this, void 0, void 0, function () {
            var userId, appointments, error_13;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        userId = (_a = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.user) === null || _a === void 0 ? void 0 : _a.id;
                        if (!userId) {
                            console.error('User ID not found');
                            throw new Error('User ID is required to fetch the profile.');
                        }
                        return [4 /*yield*/, this.userService.getcompleteAppointment(userId)];
                    case 1:
                        appointments = _b.sent();
                        return [2 /*return*/, {
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                statusCode: 201,
                                body: appointments
                            }];
                    case 2:
                        error_13 = _b.sent();
                        console.error('Error in userProfile:', error_13.message);
                        return [2 /*return*/, {
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                statusCode: 500,
                                body: { error: error_13.message || 'An unknown error occurred.' },
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.userReview = function (httpRequest) { return __awaiter(_this, void 0, void 0, function () {
            var userId, review, appointments, error_14;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        userId = (_a = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.user) === null || _a === void 0 ? void 0 : _a.id;
                        review = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.body;
                        if (!userId) {
                            console.error('User ID not found');
                            throw new Error('User ID is required to fetch the profile.');
                        }
                        return [4 /*yield*/, this.userService.userReview(userId, review)];
                    case 1:
                        appointments = _b.sent();
                        return [2 /*return*/, {
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                statusCode: 201,
                                body: appointments
                            }];
                    case 2:
                        error_14 = _b.sent();
                        console.error('Error in userProfile:', error_14.message);
                        return [2 /*return*/, {
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                statusCode: 500,
                                body: { error: error_14.message || 'An unknown error occurred.' },
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.googleLogin = function (httpRequest) { return __awaiter(_this, void 0, void 0, function () {
            var _a, displayName, email, photoURL, user, accessToken, refreshToken, generatedOtp, userId, useremail, e_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        _a = httpRequest.body, displayName = _a.displayName, email = _a.email, photoURL = _a.photoURL;
                        return [4 /*yield*/, this.userService.googleLogin({
                                displayName: displayName,
                                email: email,
                                photoURL: photoURL
                            })];
                    case 1:
                        user = _b.sent();
                        accessToken = user.accessToken, refreshToken = user.refreshToken;
                        generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
                        userId = user._id.toString();
                        useremail = email;
                        return [4 /*yield*/, this.otpService.saveOtp({ userId: userId, generatedOtp: generatedOtp }, email)];
                    case 2:
                        _b.sent();
                        return [2 /*return*/, {
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                statusCode: 201,
                                body: __assign(__assign({}, user), { accessToken: accessToken, refreshToken: refreshToken }),
                            }];
                    case 3:
                        e_4 = _b.sent();
                        console.error("Error in userSignup:", e_4);
                        return [2 /*return*/, {
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                statusCode: e_4.statusCode || 500,
                                body: {
                                    error: e_4.message || "An unexpected error occurred",
                                },
                            }];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.getReview = function (httpRequest) { return __awaiter(_this, void 0, void 0, function () {
            var doctorId, reviewDatas, error_15;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        doctorId = (_a = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.query) === null || _a === void 0 ? void 0 : _a.doctorId;
                        if (typeof doctorId !== 'string') {
                            throw new Error('doctorId must be a valid string.');
                        }
                        if (!doctorId) {
                            console.error('User ID not found');
                            throw new Error('User ID is required to fetch the profile.');
                        }
                        return [4 /*yield*/, this.userService.getReview(doctorId)];
                    case 1:
                        reviewDatas = _b.sent();
                        return [2 /*return*/, {
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                statusCode: 201,
                                body: reviewDatas
                            }];
                    case 2:
                        error_15 = _b.sent();
                        console.error('Error in userProfile:', error_15.message);
                        return [2 /*return*/, {
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                statusCode: 500,
                                body: { error: error_15.message || 'An unknown error occurred.' },
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.userService = userService;
        this.otpService = new saveOtp_1.default();
    }
    return UserController;
}());
exports.UserController = UserController;

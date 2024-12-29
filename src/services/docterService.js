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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorService = void 0;
var encription_1 = require("../utils/encription");
var errors_1 = require("../utils/errors");
var generateJWT_1 = require("../utils/generateJWT");
var DoctorService = /** @class */ (function () {
    function DoctorService(doctorRepository) {
        var _this = this;
        this.doctorSignup = function (doctorData) { return __awaiter(_this, void 0, void 0, function () {
            var encryptedPassword, doctor, accessToken, refreshToken, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        encryptedPassword = (0, encription_1.encryptPassword)(doctorData.password);
                        return [4 /*yield*/, this.doctorRepository.addDoctor(__assign(__assign({}, doctorData), { password: encryptedPassword }))];
                    case 1:
                        doctor = _a.sent();
                        accessToken = (0, generateJWT_1.generateAccessToken)(doctor._id, "doctor");
                        refreshToken = (0, generateJWT_1.generateRefreshToken)(doctor._id, "doctor");
                        return [2 /*return*/, __assign(__assign({}, doctor), { accessToken: accessToken, refreshToken: refreshToken })];
                    case 2:
                        error_1 = _a.sent();
                        console.log("Error in user service", error_1.message);
                        throw new Error(error_1.message);
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.verifyOtp = function (otpData) { return __awaiter(_this, void 0, void 0, function () {
            var userId, otp, userotp, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        userId = otpData.userId, otp = otpData.otp;
                        return [4 /*yield*/, this.doctorRepository.verifyOtp({ userId: userId })];
                    case 1:
                        userotp = _a.sent();
                        if (userotp.otp !== otp) {
                            throw new Error("Invalid OTP.");
                        }
                        if (!(userotp.otp == otp)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.doctorRepository.updateDoctorOtp(userId)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/, __assign({}, userotp)];
                    case 4:
                        error_2 = _a.sent();
                        console.log("Error in verifyOtp", error_2.message);
                        throw new Error(error_2.message);
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        this.doctorLogin = function (email, password) { return __awaiter(_this, void 0, void 0, function () {
            var user, isValidPassword, accessToken, refreshToken, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.doctorRepository.getDoctorByEmail(email)];
                    case 1:
                        user = _a.sent();
                        isValidPassword = (0, encription_1.comparePassword)(password, user.password);
                        if (!isValidPassword)
                            throw new errors_1.AppError("Invalid Credentials", 401);
                        accessToken = (0, generateJWT_1.generateAccessToken)(user._id, "doctor");
                        refreshToken = (0, generateJWT_1.generateRefreshToken)(user._id, "doctor");
                        return [2 /*return*/, {
                                _id: user._id,
                                name: user.name,
                                email: user.email,
                                phone: user.phone,
                                specialization: user.specialization,
                                experience: user.experience,
                                createdAt: user.createdAt,
                                updatedAt: user.updatedAt,
                                accessToken: accessToken,
                                refreshToken: refreshToken,
                            }];
                    case 2:
                        error_3 = _a.sent();
                        console.log("Error in userLogin", error_3.message);
                        throw new Error(error_3.message);
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.doctorProfile = function (userId) { return __awaiter(_this, void 0, void 0, function () {
            var user, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.doctorRepository.getDoctorProfile(userId)];
                    case 1:
                        user = _a.sent();
                        return [2 /*return*/, __assign({}, user)];
                    case 2:
                        error_4 = _a.sent();
                        console.log("Error in doctorProfile", error_4.message);
                        throw new Error(error_4.message);
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.updateProfile = function (formData, userId) { return __awaiter(_this, void 0, void 0, function () {
            var doctor, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.doctorRepository.updateDoctorProfile(formData, userId)];
                    case 1:
                        doctor = _a.sent();
                        return [2 /*return*/, __assign({}, doctor)];
                    case 2:
                        error_5 = _a.sent();
                        console.log("Error in doctorProfile", error_5.message);
                        throw new Error(error_5.message);
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.changeProfile = function (userId, formData) { return __awaiter(_this, void 0, void 0, function () {
            var doctor, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.doctorRepository.changeProfile(userId, formData)];
                    case 1:
                        doctor = _a.sent();
                        return [2 /*return*/, __assign({}, doctor)];
                    case 2:
                        error_6 = _a.sent();
                        console.log("Error in doctorProfile", error_6.message);
                        throw new Error(error_6.message);
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.changePassword = function (userId, oldPassword, newPassword) { return __awaiter(_this, void 0, void 0, function () {
            var doctor, hashedPassword, isValidPassword, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, this.doctorRepository.changePassword(userId, oldPassword, newPassword)];
                    case 1:
                        doctor = _a.sent();
                        return [4 /*yield*/, (0, encription_1.encryptPassword)(newPassword)];
                    case 2:
                        hashedPassword = _a.sent();
                        isValidPassword = (0, encription_1.comparePassword)(oldPassword, doctor === null || doctor === void 0 ? void 0 : doctor.password);
                        if (!isValidPassword) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.doctorRepository.changePassword(userId, hashedPassword, oldPassword)];
                    case 3:
                        doctor = _a.sent();
                        _a.label = 4;
                    case 4:
                        if (!isValidPassword)
                            throw new errors_1.AppError("Invalid Credentials", 401);
                        return [2 /*return*/, __assign({}, doctor)];
                    case 5:
                        error_7 = _a.sent();
                        console.log("Error in changepassword", error_7.message);
                        throw new Error(error_7.message);
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.getAppointments = function (doctorId) { return __awaiter(_this, void 0, void 0, function () {
            var appointments, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.doctorRepository.getAppointments(doctorId)];
                    case 1:
                        appointments = _a.sent();
                        return [2 /*return*/, appointments];
                    case 2:
                        error_8 = _a.sent();
                        console.log("Error in doctorProfile", error_8.message);
                        throw new Error(error_8.message);
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.resheduleAppointment = function (doctorId, payloadData) { return __awaiter(_this, void 0, void 0, function () {
            var appointments, error_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.doctorRepository.resheduleAppointment(doctorId, payloadData)];
                    case 1:
                        appointments = _a.sent();
                        return [2 /*return*/, appointments];
                    case 2:
                        error_9 = _a.sent();
                        console.log("Error in doctorProfile", error_9.message);
                        throw new Error(error_9.message);
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.completeAppointment = function (doctorId, appointmentId) { return __awaiter(_this, void 0, void 0, function () {
            var appointments, error_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.doctorRepository.completeAppointment(doctorId, appointmentId)];
                    case 1:
                        appointments = _a.sent();
                        return [2 /*return*/, appointments];
                    case 2:
                        error_10 = _a.sent();
                        console.log("Error in doctorProfile", error_10.message);
                        throw new Error(error_10.message);
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.cancelAppointment = function (doctorId, appointmentId) { return __awaiter(_this, void 0, void 0, function () {
            var appointments, error_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.doctorRepository.cancelAppointment(doctorId, appointmentId)];
                    case 1:
                        appointments = _a.sent();
                        return [2 /*return*/, appointments];
                    case 2:
                        error_11 = _a.sent();
                        console.log("Error in doctorProfile", error_11.message);
                        throw new Error(error_11.message);
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.updateProfilepic = function (doctorId, profilePic) { return __awaiter(_this, void 0, void 0, function () {
            var appointments, error_12;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.doctorRepository.updateProfilepic(doctorId, profilePic)];
                    case 1:
                        appointments = _a.sent();
                        return [2 /*return*/, appointments];
                    case 2:
                        error_12 = _a.sent();
                        console.log("Error in doctorProfile", error_12.message);
                        throw new Error(error_12.message);
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.chatwithUser = function (doctorId, appointmentId) { return __awaiter(_this, void 0, void 0, function () {
            var appointments, error_13;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.doctorRepository.chatwithUser(doctorId, appointmentId)];
                    case 1:
                        appointments = _a.sent();
                        return [2 /*return*/, appointments];
                    case 2:
                        error_13 = _a.sent();
                        console.log("Error in chat", error_13.message);
                        throw new Error(error_13.message);
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.sendMessage = function (roomId, message) { return __awaiter(_this, void 0, void 0, function () {
            var chatmessage, error_14;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.doctorRepository.sendMessage(roomId, message)];
                    case 1:
                        chatmessage = _a.sent();
                        return [2 /*return*/, chatmessage];
                    case 2:
                        error_14 = _a.sent();
                        console.log("Error in chat", error_14.message);
                        throw new Error(error_14.message);
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getMessage = function (roomId) { return __awaiter(_this, void 0, void 0, function () {
            var chatmessage, error_15;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.doctorRepository.getMessage(roomId)];
                    case 1:
                        chatmessage = _a.sent();
                        return [2 /*return*/, chatmessage];
                    case 2:
                        error_15 = _a.sent();
                        console.log("Error in chat", error_15.message);
                        throw new Error(error_15.message);
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getChatMembers = function (doctorId) { return __awaiter(_this, void 0, void 0, function () {
            var chatmessage, error_16;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.doctorRepository.getChatMembers(doctorId)];
                    case 1:
                        chatmessage = _a.sent();
                        return [2 /*return*/, chatmessage];
                    case 2:
                        error_16 = _a.sent();
                        console.log("Error in chat", error_16.message);
                        throw new Error(error_16.message);
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.forgotPasswordOtp = function (email) { return __awaiter(_this, void 0, void 0, function () {
            var otp, error_17;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.doctorRepository.forgotPasswordOtp(email)];
                    case 1:
                        otp = _a.sent();
                        return [2 /*return*/, otp];
                    case 2:
                        error_17 = _a.sent();
                        console.log("Error in chat", error_17.message);
                        throw new Error(error_17.message);
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.forgotPassword = function (otpDataa) { return __awaiter(_this, void 0, void 0, function () {
            var userId, otp, password, hashedPassword, userotp, error_18;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        userId = otpDataa.userId, otp = otpDataa.otp, password = otpDataa.password;
                        console.log(userId);
                        return [4 /*yield*/, (0, encription_1.encryptPassword)(password)];
                    case 1:
                        hashedPassword = _a.sent();
                        return [4 /*yield*/, this.doctorRepository.forgotPassword(userId)];
                    case 2:
                        userotp = _a.sent();
                        if (userotp.status !== otp) {
                            throw new Error("Invalid OTP.");
                        }
                        if (!(userotp.status == otp)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.doctorRepository.updateDoctorPassword(userId, hashedPassword)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/, __assign({}, userotp)];
                    case 5:
                        error_18 = _a.sent();
                        console.log("Error in verifyOtp", error_18.message);
                        throw new Error(error_18.message);
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.doctorRepository = doctorRepository;
    }
    return DoctorService;
}());
exports.DoctorService = DoctorService;

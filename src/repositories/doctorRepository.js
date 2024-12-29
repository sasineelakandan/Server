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
exports.DoctorRepository = void 0;
var doctorModel_1 = __importDefault(require("../models/doctorModel"));
var otpModel_1 = __importDefault(require("../models/otpModel"));
var slotsModel_1 = __importDefault(require("../models/slotsModel"));
var appointmentModel_1 = __importDefault(require("../models/appointmentModel"));
var chatRoomModel_1 = __importDefault(require("../models/chatRoomModel"));
var messageModel_1 = __importDefault(require("../models/messageModel"));
var index_1 = require("../../src/index");
var DoctorRepository = /** @class */ (function () {
    function DoctorRepository() {
        var _this = this;
        this.addDoctor = function (doctorData) { return __awaiter(_this, void 0, void 0, function () {
            var doctor, error_1, field, value;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, doctorModel_1.default.create(__assign({}, doctorData))];
                    case 1:
                        doctor = _a.sent();
                        return [2 /*return*/, {
                                _id: doctor._id.toString(),
                                name: doctor.name,
                                email: doctor.email,
                                phone: doctor.phone,
                                password: doctor.password,
                                specialization: doctor.specialization,
                                experience: doctor.experience,
                                createdAt: doctor.createdAt,
                                updatedAt: doctor.updatedAt,
                            }];
                    case 2:
                        error_1 = _a.sent();
                        console.error("Error adding user:", error_1);
                        if (error_1.code === 11000) {
                            field = Object.keys(error_1.keyValue)[0];
                            value = error_1.keyValue[field];
                            error_1.message = "".concat(field, " '").concat(value, "' already exists.");
                        }
                        throw new Error(error_1.message);
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.verifyOtp = function (doctorOtpData) { return __awaiter(_this, void 0, void 0, function () {
            var userId, otp, error_2, field, value;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        userId = doctorOtpData.userId;
                        return [4 /*yield*/, otpModel_1.default.findOne({ userId: userId })];
                    case 1:
                        otp = _a.sent();
                        if (!otp) {
                            throw new Error("OTP not found or expired.");
                        }
                        if (otp.expiresAt < new Date()) {
                            throw new Error("OTP has expired.");
                        }
                        return [2 /*return*/, {
                                _id: otp._id.toString(),
                                doctorId: otp.userId.toString(),
                                otp: otp.otpCode.toString(),
                                expiryDate: otp.expiresAt
                            }];
                    case 2:
                        error_2 = _a.sent();
                        console.error("Error find Otp:", error_2);
                        if (error_2.code === 11000) {
                            field = Object.keys(error_2.keyValue)[0];
                            value = error_2.keyValue[field];
                            error_2.message = "".concat(field, " '").concat(value, "' already exists.");
                        }
                        throw new Error(error_2.message);
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.updateDoctorOtp = function (userId) { return __awaiter(_this, void 0, void 0, function () {
            var user, error_3, field, value;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, doctorModel_1.default.updateOne({ _id: userId }, { $set: { isOtpVerified: true } })];
                    case 1:
                        user = _a.sent();
                        return [2 /*return*/, { message: 'doctorOtp updated' }];
                    case 2:
                        error_3 = _a.sent();
                        console.error("Error find update Doctor:", error_3);
                        if (error_3.code === 11000) {
                            field = Object.keys(error_3.keyValue)[0];
                            value = error_3.keyValue[field];
                            error_3.message = "".concat(field, " '").concat(value, "' already exists.");
                        }
                        throw new Error(error_3.message);
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getDoctorByEmail = function (email) { return __awaiter(_this, void 0, void 0, function () {
            var user, error_4, field, value;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, doctorModel_1.default.findOne({ email: email, isOtpVerified: true })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw new Error("User not found .");
                        }
                        if (user.isBlocked) {
                            throw new Error("You are blocked.");
                        }
                        return [2 /*return*/, {
                                _id: user._id.toString(),
                                name: user.name,
                                email: user.email,
                                phone: user.phone,
                                specialization: user.specialization,
                                experience: user.experience,
                                password: user.password,
                                createdAt: user.createdAt,
                                updatedAt: user.updatedAt,
                            }];
                    case 2:
                        error_4 = _a.sent();
                        console.error("Error find loginUser:", error_4);
                        if (error_4.code === 11000) {
                            field = Object.keys(error_4.keyValue)[0];
                            value = error_4.keyValue[field];
                            error_4.message = "".concat(field, " '").concat(value, "' already exists.");
                        }
                        throw new Error(error_4.message);
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getDoctorProfile = function (userId) { return __awaiter(_this, void 0, void 0, function () {
            var doctor, error_5;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, doctorModel_1.default.findOne({ _id: userId })];
                    case 1:
                        doctor = _c.sent();
                        if (!doctor) {
                            throw new Error("Doctor with ID ".concat(userId, " not found."));
                        }
                        return [2 /*return*/, {
                                _id: doctor._id.toString(),
                                name: doctor.name || "",
                                email: doctor.email || "",
                                phone: doctor.phone || "",
                                specialization: doctor.specialization || "",
                                licenseImage: doctor.licenseImage || "",
                                hospitalName: doctor.hospitalName || "",
                                fees: ((_a = doctor.fees) === null || _a === void 0 ? void 0 : _a.toString()) || "",
                                licenseNumber: ((_b = doctor.licenseNumber) === null || _b === void 0 ? void 0 : _b.toString()) || "",
                                profilePic: doctor.profilePic || "",
                                experience: doctor.experience.toString() || "",
                                isVerified: doctor.isVerified,
                                password: doctor.password,
                                location: doctor.location,
                                createdAt: doctor.createdAt,
                                updatedAt: doctor.updatedAt,
                            }];
                    case 2:
                        error_5 = _c.sent();
                        console.error("Error finding doctor:", error_5);
                        throw new Error("Unable to fetch doctor profile. Please try again later.");
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.updateDoctorProfile = function (formData, userId) { return __awaiter(_this, void 0, void 0, function () {
            var licenseImage, licenseImage1, hospitalName, fees, licenseNumber, updateDoctor, doctor, error_6;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 3, , 4]);
                        licenseImage = formData.licenseImage, licenseImage1 = formData.licenseImage1, hospitalName = formData.hospitalName, fees = formData.fees, licenseNumber = formData.licenseNumber;
                        return [4 /*yield*/, doctorModel_1.default.updateOne({ _id: userId }, { $set: {
                                    licenseImage: licenseImage,
                                    profilePic: licenseImage1,
                                    hospitalName: hospitalName,
                                    fees: fees,
                                    licenseNumber: licenseNumber
                                } })];
                    case 1:
                        updateDoctor = _c.sent();
                        return [4 /*yield*/, doctorModel_1.default.findOne({ _id: userId })];
                    case 2:
                        doctor = _c.sent();
                        if (!doctor) {
                            throw new Error("Doctor with ID ".concat(userId, " not found."));
                        }
                        return [2 /*return*/, {
                                _id: doctor._id.toString(),
                                name: doctor.name || "",
                                email: doctor.email || "",
                                phone: doctor.phone || "",
                                specialization: doctor.specialization || "",
                                licenseImage: doctor.licenseImage || "",
                                hospitalName: doctor.hospitalName || "",
                                fees: ((_a = doctor.fees) === null || _a === void 0 ? void 0 : _a.toString()) || "",
                                licenseNumber: ((_b = doctor.licenseNumber) === null || _b === void 0 ? void 0 : _b.toString()) || "",
                                profilePic: doctor.profilePic || "",
                                experience: doctor.experience.toString() || "",
                                isVerified: doctor.isVerified,
                                password: doctor.password,
                                location: doctor.location,
                                createdAt: doctor.createdAt,
                                updatedAt: doctor.updatedAt,
                            }];
                    case 3:
                        error_6 = _c.sent();
                        console.error("Error finding doctor:", error_6);
                        throw new Error("Unable to fetch doctor profile. Please try again later.");
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.changeProfile = function (userId, formData) { return __awaiter(_this, void 0, void 0, function () {
            var phone, name_1, hospitalName, fees, experience, updateDoctor, doctor, error_7;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 3, , 4]);
                        phone = formData.phone, name_1 = formData.name, hospitalName = formData.hospitalName, fees = formData.fees, experience = formData.experience;
                        return [4 /*yield*/, doctorModel_1.default.updateOne({ _id: userId }, { $set: {
                                    name: name_1,
                                    phone: phone,
                                    hospitalName: hospitalName,
                                    fees: fees,
                                    experience: experience
                                } })];
                    case 1:
                        updateDoctor = _c.sent();
                        return [4 /*yield*/, doctorModel_1.default.findOne({ _id: userId })];
                    case 2:
                        doctor = _c.sent();
                        if (!doctor) {
                            throw new Error("Doctor with ID ".concat(userId, " not found."));
                        }
                        return [2 /*return*/, {
                                _id: doctor._id.toString(),
                                name: doctor.name || "",
                                email: doctor.email || "",
                                phone: doctor.phone || "",
                                specialization: doctor.specialization || "",
                                licenseImage: doctor.licenseImage || "",
                                hospitalName: doctor.hospitalName || "",
                                fees: ((_a = doctor.fees) === null || _a === void 0 ? void 0 : _a.toString()) || "",
                                licenseNumber: ((_b = doctor.licenseNumber) === null || _b === void 0 ? void 0 : _b.toString()) || "",
                                profilePic: doctor.profilePic || "",
                                experience: doctor.experience.toString() || "",
                                isVerified: doctor.isVerified,
                                password: doctor.password,
                                location: doctor.location,
                                createdAt: doctor.createdAt,
                                updatedAt: doctor.updatedAt,
                            }];
                    case 3:
                        error_7 = _c.sent();
                        console.error("Error finding doctor:", error_7);
                        throw new Error("Unable to fetch doctor profile. Please try again later.");
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.changePassword = function (userId, hashedPassword, oldPassword) { return __awaiter(_this, void 0, void 0, function () {
            var doctor, userUpdate, error_8;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, doctorModel_1.default.findOne({ _id: userId })];
                    case 1:
                        doctor = _c.sent();
                        if (!doctor) {
                            throw new Error("Doctor with ID ".concat(userId, " not found."));
                        }
                        return [4 /*yield*/, doctorModel_1.default.updateOne({ _id: userId }, { $set: { password: hashedPassword } })];
                    case 2:
                        userUpdate = _c.sent();
                        return [2 /*return*/, {
                                _id: doctor._id.toString(),
                                name: doctor.name || "",
                                email: doctor.email || "",
                                phone: doctor.phone || "",
                                specialization: doctor.specialization || "",
                                licenseImage: doctor.licenseImage || "",
                                hospitalName: doctor.hospitalName || "",
                                fees: ((_a = doctor.fees) === null || _a === void 0 ? void 0 : _a.toString()) || "",
                                licenseNumber: ((_b = doctor.licenseNumber) === null || _b === void 0 ? void 0 : _b.toString()) || "",
                                profilePic: doctor.profilePic || "",
                                experience: doctor.experience.toString() || "",
                                isVerified: doctor.isVerified,
                                password: doctor.password,
                                location: doctor === null || doctor === void 0 ? void 0 : doctor.location,
                                createdAt: doctor.createdAt,
                                updatedAt: doctor.updatedAt,
                            }];
                    case 3:
                        error_8 = _c.sent();
                        console.error("Error find loginUser:", error_8);
                        throw new Error(error_8.message);
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.getAppointments = function (doctorId) { return __awaiter(_this, void 0, void 0, function () {
            var appointments, error_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, appointmentModel_1.default.find({ doctorId: doctorId }).sort({ _id: -1 })
                                .populate('slotId')
                                .populate('doctorId')
                                .populate('patientId')
                                .populate('paymentId')
                                .populate('userId')];
                    case 1:
                        appointments = _a.sent();
                        if (!appointments) {
                            throw new Error("Doctor with ID ".concat(doctorId, " not found."));
                        }
                        return [2 /*return*/, appointments];
                    case 2:
                        error_9 = _a.sent();
                        console.error("Error in slot creation:", error_9);
                        throw new Error(error_9.message);
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.resheduleAppointment = function (doctorId, payloadData) { return __awaiter(_this, void 0, void 0, function () {
            var date, startTime, endTime, appointmentId, appointments, slotUpdate, updateAppointment, error_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        date = payloadData.date, startTime = payloadData.startTime, endTime = payloadData.endTime, appointmentId = payloadData.appointmentId;
                        return [4 /*yield*/, appointmentModel_1.default.findOne({ doctorId: doctorId, _id: appointmentId })];
                    case 1:
                        appointments = _a.sent();
                        return [4 /*yield*/, slotsModel_1.default.updateOne({ _id: appointments === null || appointments === void 0 ? void 0 : appointments.slotId }, { $set: { date: date, startTime: startTime, endTime: endTime } })];
                    case 2:
                        slotUpdate = _a.sent();
                        return [4 /*yield*/, appointmentModel_1.default.updateOne({ _id: appointmentId }, { $set: { status: 'rescheduled' } })];
                    case 3:
                        updateAppointment = _a.sent();
                        if (!appointments) {
                            throw new Error("Doctor with ID ".concat(doctorId, " not found."));
                        }
                        return [2 /*return*/, {
                                status: 'success',
                                message: 'Slot assigned successfully',
                            }];
                    case 4:
                        error_10 = _a.sent();
                        console.error("Error in slot creation:", error_10);
                        throw new Error(error_10.message);
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        this.completeAppointment = function (doctorId, appointmentId) { return __awaiter(_this, void 0, void 0, function () {
            var updateAppointment, error_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, appointmentModel_1.default.updateOne({ _id: appointmentId }, { $set: { status: 'completed' } })];
                    case 1:
                        updateAppointment = _a.sent();
                        if (!doctorId) {
                            throw new Error("Doctor with ID ".concat(doctorId, " not found."));
                        }
                        return [2 /*return*/, {
                                status: 'success',
                                message: 'Slot assigned successfully',
                            }];
                    case 2:
                        error_11 = _a.sent();
                        console.error("Error in slot creation:", error_11);
                        throw new Error(error_11.message);
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.cancelAppointment = function (doctorId, appointmentId) { return __awaiter(_this, void 0, void 0, function () {
            var updateAppointment, error_12;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, appointmentModel_1.default.updateOne({ _id: appointmentId }, { $set: { status: 'canceled' } })];
                    case 1:
                        updateAppointment = _a.sent();
                        if (!doctorId) {
                            throw new Error("Doctor with ID ".concat(doctorId, " not found."));
                        }
                        return [2 /*return*/, {
                                status: 'success',
                                message: 'Slot assigned successfully',
                            }];
                    case 2:
                        error_12 = _a.sent();
                        console.error("Error in slot creation:", error_12);
                        throw new Error(error_12.message);
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.updateProfilepic = function (doctorId, profilePic) { return __awaiter(_this, void 0, void 0, function () {
            var updateProfilePic, error_13;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, doctorModel_1.default.updateOne({ _id: doctorId }, { $set: { profilePic: profilePic } })];
                    case 1:
                        updateProfilePic = _a.sent();
                        if (!doctorId) {
                            throw new Error("Doctor with ID ".concat(doctorId, " not found."));
                        }
                        return [2 /*return*/, {
                                status: 'success',
                                message: 'Slot assigned successfully',
                            }];
                    case 2:
                        error_13 = _a.sent();
                        console.error("Error in slot creation:", error_13);
                        throw new Error(error_13.message);
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.chatwithUser = function (doctorId, appointmentId) { return __awaiter(_this, void 0, void 0, function () {
            var chatter, existingRoom, newChatRoom, savedRoom, error_14;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        if (!doctorId) {
                            throw new Error("User with ID ".concat(doctorId, " not found."));
                        }
                        if (!appointmentId) {
                            throw new Error("Appointment with ID ".concat(appointmentId, " not found."));
                        }
                        return [4 /*yield*/, appointmentModel_1.default.findOne({ _id: appointmentId, doctorId: doctorId })];
                    case 1:
                        chatter = _a.sent();
                        return [4 /*yield*/, chatRoomModel_1.default.findOne({ patient: chatter === null || chatter === void 0 ? void 0 : chatter.userId, doctor: doctorId })];
                    case 2:
                        existingRoom = _a.sent();
                        if (existingRoom) {
                            return [2 /*return*/, {
                                    status: existingRoom === null || existingRoom === void 0 ? void 0 : existingRoom._id.toString(),
                                    message: "Chat room already exists.",
                                }];
                        }
                        newChatRoom = new chatRoomModel_1.default({
                            patient: chatter === null || chatter === void 0 ? void 0 : chatter.userId,
                            doctor: doctorId,
                        });
                        return [4 /*yield*/, newChatRoom.save()];
                    case 3:
                        savedRoom = _a.sent();
                        return [2 /*return*/, {
                                status: savedRoom === null || savedRoom === void 0 ? void 0 : savedRoom._id.toString(),
                                message: "Chat room created successfully",
                            }];
                    case 4:
                        error_14 = _a.sent();
                        console.error("Error in chatroom:", error_14);
                        throw new Error(error_14.message);
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        this.sendMessage = function (roomId, message) { return __awaiter(_this, void 0, void 0, function () {
            var chatter, updatedRoom, createMsg, error_15;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        // Validate inputs
                        if (!roomId) {
                            throw new Error("Room ID is required.");
                        }
                        if (!message) {
                            throw new Error("Message content is required.");
                        }
                        return [4 /*yield*/, chatRoomModel_1.default.findOne({ _id: roomId })];
                    case 1:
                        chatter = _a.sent();
                        if (!chatter) {
                            throw new Error("Chat room with ID ".concat(roomId, " not found."));
                        }
                        return [4 /*yield*/, chatRoomModel_1.default.updateOne({ _id: roomId }, { $set: { lastMessage: message === null || message === void 0 ? void 0 : message.content } })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, chatRoomModel_1.default.findOne({ _id: roomId })];
                    case 3:
                        updatedRoom = _a.sent();
                        console.log('Updated Chat Room:', updatedRoom);
                        return [4 /*yield*/, messageModel_1.default.create({
                                sender: chatter.patient,
                                receiver: chatter.doctor,
                                roomId: roomId,
                                content: message === null || message === void 0 ? void 0 : message.content,
                            })];
                    case 4:
                        createMsg = _a.sent();
                        index_1.io.to(roomId).emit("message", { createMsg: createMsg });
                        return [2 /*return*/, {
                                status: "success",
                                message: "Message sent successfully.",
                            }];
                    case 5:
                        error_15 = _a.sent();
                        console.error("Error in sendMessage doctor:", error_15);
                        throw new Error(error_15.message);
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.getMessage = function (roomId) { return __awaiter(_this, void 0, void 0, function () {
            var chatRoomUp, message, error_16;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        if (!roomId) {
                            throw new Error("User with ID ".concat(roomId, " not found."));
                        }
                        return [4 /*yield*/, messageModel_1.default.updateMany({ roomId: roomId }, { $set: { isRead: true } })];
                    case 1:
                        chatRoomUp = _a.sent();
                        return [4 /*yield*/, messageModel_1.default.find({ roomId: roomId })];
                    case 2:
                        message = _a.sent();
                        return [2 /*return*/, message];
                    case 3:
                        error_16 = _a.sent();
                        console.error("Error in chatroom:", error_16);
                        throw new Error(error_16.message);
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.getChatMembers = function (doctorId) { return __awaiter(_this, void 0, void 0, function () {
            var message, error_17;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (!doctorId) {
                            throw new Error("User with ID ".concat(doctorId, " not found."));
                        }
                        return [4 /*yield*/, chatRoomModel_1.default.find({ doctor: doctorId }).populate('patient')];
                    case 1:
                        message = _a.sent();
                        return [2 /*return*/, message];
                    case 2:
                        error_17 = _a.sent();
                        console.error("Error in chatroom:", error_17);
                        throw new Error(error_17.message);
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.forgotPasswordOtp = function (email) { return __awaiter(_this, void 0, void 0, function () {
            var doctor, error_18;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, doctorModel_1.default.findOne({ email: email })];
                    case 1:
                        doctor = _a.sent();
                        if (!email) {
                            throw new Error("Doctor with ID ".concat(email, " not found."));
                        }
                        return [2 /*return*/, {
                                status: (doctor === null || doctor === void 0 ? void 0 : doctor._id.toString()) || '',
                                message: 'Slot assigned successfully',
                            }];
                    case 2:
                        error_18 = _a.sent();
                        console.error("Error in slot creation:", error_18);
                        throw new Error(error_18.message);
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.forgotPassword = function (userId) { return __awaiter(_this, void 0, void 0, function () {
            var otp, error_19, field, value;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, otpModel_1.default.findOne({ userId: userId })];
                    case 1:
                        otp = _a.sent();
                        if (!otp) {
                            throw new Error("OTP not found or expired.");
                        }
                        if (otp.expiresAt < new Date()) {
                            throw new Error("OTP has expired.");
                        }
                        return [2 /*return*/, {
                                status: otp.otpCode,
                                message: "Message sent successfully.",
                            }];
                    case 2:
                        error_19 = _a.sent();
                        console.error("Error find Otp:", error_19);
                        if (error_19.code === 11000) {
                            field = Object.keys(error_19.keyValue)[0];
                            value = error_19.keyValue[field];
                            error_19.message = "".concat(field, " '").concat(value, "' already exists.");
                        }
                        throw new Error(error_19.message);
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.updateDoctorPassword = function (userId, password) { return __awaiter(_this, void 0, void 0, function () {
            var user, error_20, field, value;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, doctorModel_1.default.updateOne({ _id: userId }, { $set: { password: password } })];
                    case 1:
                        user = _a.sent();
                        return [2 /*return*/, {
                                status: "success",
                                message: "Message sent successfully.",
                            }];
                    case 2:
                        error_20 = _a.sent();
                        console.error("Error find update Doctor:", error_20);
                        if (error_20.code === 11000) {
                            field = Object.keys(error_20.keyValue)[0];
                            value = error_20.keyValue[field];
                            error_20.message = "".concat(field, " '").concat(value, "' already exists.");
                        }
                        throw new Error(error_20.message);
                    case 3: return [2 /*return*/];
                }
            });
        }); };
    }
    return DoctorRepository;
}());
exports.DoctorRepository = DoctorRepository;

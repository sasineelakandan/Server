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
exports.UserRepository = void 0;
var userModel_1 = __importDefault(require("../models/userModel"));
var otpModel_1 = __importDefault(require("../models/otpModel"));
var appointmentModel_1 = __importDefault(require("../models/appointmentModel"));
var chatRoomModel_1 = __importDefault(require("../models/chatRoomModel"));
var messageModel_1 = __importDefault(require("../models/messageModel"));
var slotsModel_1 = __importDefault(require("../models/slotsModel"));
var reviewModel_1 = __importDefault(require("../models/reviewModel"));
var index_1 = require("../../src/index");
var UserRepository = /** @class */ (function () {
    function UserRepository() {
        var _this = this;
        this.addUser = function (userData) { return __awaiter(_this, void 0, void 0, function () {
            var user, error_1, field, value;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, userModel_1.default.create(__assign({}, userData))];
                    case 1:
                        user = _a.sent();
                        return [2 /*return*/, {
                                _id: user._id.toString(),
                                username: user.username,
                                email: user.email,
                                phone: user.phone || '',
                                createdAt: user.createdAt,
                                updatedAt: user.updatedAt,
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
        this.verifyOtp = function (otpData) { return __awaiter(_this, void 0, void 0, function () {
            var userId, otp, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        userId = otpData.userId;
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
                                userId: otp.userId.toString(),
                                otp: otp.otpCode.toString(),
                                expiryDate: otp.expiresAt
                            }];
                    case 2:
                        error_2 = _a.sent();
                        console.error("Error find Otp:", error_2);
                        throw new Error(error_2.message);
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getUserByEmail = function (email) { return __awaiter(_this, void 0, void 0, function () {
            var user, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, userModel_1.default.findOne({ email: email, otpVerified: true })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw new Error("User not found or expired.");
                        }
                        if (user.isBlock) {
                            console.log('hai');
                            throw new Error("You are Blocked!.");
                        }
                        return [2 /*return*/, {
                                _id: user._id.toString(),
                                username: user.username,
                                email: user.email,
                                phone: user.phone || '',
                                password: user.password || '',
                                createdAt: user.createdAt,
                                updatedAt: user.updatedAt,
                            }];
                    case 2:
                        error_3 = _a.sent();
                        console.error("Error find loginUser:", error_3);
                        throw new Error(error_3.message);
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.updateUserOtp = function (userId) { return __awaiter(_this, void 0, void 0, function () {
            var user, error_4, field, value;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, userModel_1.default.updateOne({ _id: userId }, { $set: { otpVerified: true } })];
                    case 1:
                        user = _a.sent();
                        return [2 /*return*/, { message: 'userOtp updated' }];
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
        this.userProfile = function (userId) { return __awaiter(_this, void 0, void 0, function () {
            var user, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, userModel_1.default.findOne({ _id: userId })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw new Error("Doctor with ID ".concat(userId, " not found."));
                        }
                        return [2 /*return*/, {
                                _id: user._id.toString(),
                                username: user.username,
                                email: user.email,
                                phone: user.phone || '',
                                profilePic: user.profilePic || '',
                                password: user.password || '',
                                createdAt: user.createdAt,
                                updatedAt: user.updatedAt,
                            }];
                    case 2:
                        error_5 = _a.sent();
                        console.error("Error find loginUser:", error_5);
                        throw new Error(error_5.message);
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.changeProfile = function (userId, name, phone) { return __awaiter(_this, void 0, void 0, function () {
            var userUpdate, user, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, userModel_1.default.updateOne({ _id: userId }, { $set: { username: name, phone: phone } })];
                    case 1:
                        userUpdate = _a.sent();
                        return [4 /*yield*/, userModel_1.default.findOne({ _id: userId })];
                    case 2:
                        user = _a.sent();
                        if (!user) {
                            throw new Error("Doctor with ID ".concat(userId, " not found."));
                        }
                        return [2 /*return*/, {
                                _id: user._id.toString(),
                                username: user.username,
                                email: user.email,
                                phone: user.phone || '',
                                profilePic: user.profilePic || '',
                                password: user.password || '',
                                createdAt: user.createdAt,
                                updatedAt: user.updatedAt,
                            }];
                    case 3:
                        error_6 = _a.sent();
                        console.error("Error find loginUser:", error_6);
                        throw new Error(error_6.message);
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.changePassword = function (userId, hashedPassword, oldPassword) { return __awaiter(_this, void 0, void 0, function () {
            var user, userUpdate, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, userModel_1.default.findOne({ _id: userId })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw new Error("Doctor with ID ".concat(userId, " not found."));
                        }
                        return [4 /*yield*/, userModel_1.default.updateOne({ _id: userId }, { $set: { password: hashedPassword } })];
                    case 2:
                        userUpdate = _a.sent();
                        return [2 /*return*/, {
                                _id: user._id.toString(),
                                username: user.username,
                                email: user.email,
                                phone: user.phone || '',
                                profilePic: user.profilePic || '',
                                password: (user === null || user === void 0 ? void 0 : user.password) || '',
                                createdAt: user.createdAt,
                                updatedAt: user.updatedAt,
                            }];
                    case 3:
                        error_7 = _a.sent();
                        console.error("Error find loginUser:", error_7);
                        throw new Error(error_7.message);
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.getAppointments = function (userId) { return __awaiter(_this, void 0, void 0, function () {
            var appointments, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, appointmentModel_1.default.find({ userId: userId }).sort({ _id: -1 })
                                .populate('slotId')
                                .populate('doctorId')
                                .populate('patientId')
                                .populate('userId')];
                    case 1:
                        appointments = _a.sent();
                        console.log(appointments);
                        if (!appointments) {
                            throw new Error("Doctor with ID ".concat(userId, " not found."));
                        }
                        return [2 /*return*/, appointments];
                    case 2:
                        error_8 = _a.sent();
                        console.error("Error in slot creation:", error_8);
                        throw new Error(error_8.message);
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.cancelAppointments = function (userId, appointmentId) { return __awaiter(_this, void 0, void 0, function () {
            var appointment, slot, updateAppointment, error_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, appointmentModel_1.default.findOne({ _id: appointmentId })];
                    case 1:
                        appointment = _a.sent();
                        return [4 /*yield*/, slotsModel_1.default.updateOne({ _id: appointment === null || appointment === void 0 ? void 0 : appointment.slotId }, { status: 'booked', booked: false })];
                    case 2:
                        slot = _a.sent();
                        return [4 /*yield*/, appointmentModel_1.default.updateOne({ _id: appointmentId }, { $set: { status: 'canceled' } })];
                    case 3:
                        updateAppointment = _a.sent();
                        if (!userId) {
                            throw new Error("Doctor with ID ".concat(userId, " not found."));
                        }
                        return [2 /*return*/, {
                                status: 'success',
                                message: 'Slot assigned successfully',
                            }];
                    case 4:
                        error_9 = _a.sent();
                        console.error("Error in slot creation:", error_9);
                        throw new Error(error_9.message);
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        this.updateProfilePic = function (userId, profilePic) { return __awaiter(_this, void 0, void 0, function () {
            var updateProfilePic, error_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (!userId) {
                            throw new Error("user with ID ".concat(userId, " not found."));
                        }
                        return [4 /*yield*/, userModel_1.default.updateOne({ _id: userId }, { $set: { profilePic: profilePic } })];
                    case 1:
                        updateProfilePic = _a.sent();
                        return [2 /*return*/, {
                                status: 'success',
                                message: 'Slot assigned successfully',
                            }];
                    case 2:
                        error_10 = _a.sent();
                        console.error("Error in slot creation:", error_10);
                        throw new Error(error_10.message);
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.chatwithDoctor = function (userId, appointmentId) { return __awaiter(_this, void 0, void 0, function () {
            var chatter, existingRoom, newChatRoom, savedRoom, error_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        if (!userId) {
                            throw new Error("User with ID ".concat(userId, " not found."));
                        }
                        if (!appointmentId) {
                            throw new Error("Appointment with ID ".concat(appointmentId, " not found."));
                        }
                        return [4 /*yield*/, appointmentModel_1.default.findOne({ _id: appointmentId, userId: userId })];
                    case 1:
                        chatter = _a.sent();
                        return [4 /*yield*/, chatRoomModel_1.default.findOne({ patient: userId, doctor: chatter === null || chatter === void 0 ? void 0 : chatter.doctorId })];
                    case 2:
                        existingRoom = _a.sent();
                        if (existingRoom) {
                            return [2 /*return*/, {
                                    status: existingRoom === null || existingRoom === void 0 ? void 0 : existingRoom._id.toString(),
                                    message: "Chat room already exists.",
                                }];
                        }
                        newChatRoom = new chatRoomModel_1.default({
                            patient: userId,
                            doctor: chatter === null || chatter === void 0 ? void 0 : chatter.doctorId,
                        });
                        return [4 /*yield*/, newChatRoom.save()];
                    case 3:
                        savedRoom = _a.sent();
                        return [2 /*return*/, {
                                status: savedRoom === null || savedRoom === void 0 ? void 0 : savedRoom._id.toString(),
                                message: "Chat room created successfully",
                            }];
                    case 4:
                        error_11 = _a.sent();
                        console.error("Error in chatroom:", error_11);
                        throw new Error(error_11.message);
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        this.sendMessage = function (roomId, message) { return __awaiter(_this, void 0, void 0, function () {
            var chatter, updateChatter, createMsg, error_12;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        if (!roomId) {
                            throw new Error("User with ID ".concat(roomId, " not found."));
                        }
                        if (!message) {
                            throw new Error("Appointment with ID ".concat(message, " not found."));
                        }
                        return [4 /*yield*/, chatRoomModel_1.default.findOne({ _id: roomId })];
                    case 1:
                        chatter = _a.sent();
                        return [4 /*yield*/, chatRoomModel_1.default.updateOne({ _id: roomId }, { $set: { lastMessage: message === null || message === void 0 ? void 0 : message.content } })];
                    case 2:
                        updateChatter = _a.sent();
                        return [4 /*yield*/, messageModel_1.default.create({ sender: chatter === null || chatter === void 0 ? void 0 : chatter.patient, receiver: chatter === null || chatter === void 0 ? void 0 : chatter.doctor, roomId: roomId, content: message === null || message === void 0 ? void 0 : message.content })];
                    case 3:
                        createMsg = _a.sent();
                        index_1.io.to(roomId).emit("message", { createMsg: createMsg });
                        return [2 /*return*/, {
                                status: 'sucess',
                                message: "Chat room created successfully",
                            }];
                    case 4:
                        error_12 = _a.sent();
                        console.error("Error in chatroom:", error_12);
                        throw new Error(error_12.message);
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        this.getMessage = function (roomId) { return __awaiter(_this, void 0, void 0, function () {
            var chatRoomUp, readmessage, message, error_13;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        if (!roomId) {
                            throw new Error("User with ID ".concat(roomId, " not found."));
                        }
                        return [4 /*yield*/, chatRoomModel_1.default.updateOne({ _id: roomId }, { $set: { isReadUc: 0 } })];
                    case 1:
                        chatRoomUp = _a.sent();
                        return [4 /*yield*/, messageModel_1.default.updateMany({ roomId: roomId }, { $set: { isRead: true } })];
                    case 2:
                        readmessage = _a.sent();
                        return [4 /*yield*/, messageModel_1.default.find({ roomId: roomId })];
                    case 3:
                        message = _a.sent();
                        return [2 /*return*/, message];
                    case 4:
                        error_13 = _a.sent();
                        console.error("Error in chatroom:", error_13);
                        throw new Error(error_13.message);
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        this.getChatMembers = function (userId) { return __awaiter(_this, void 0, void 0, function () {
            var message, error_14;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (!userId) {
                            throw new Error("User with ID ".concat(userId, " not found."));
                        }
                        return [4 /*yield*/, chatRoomModel_1.default.find({ patient: userId }).populate('doctor')];
                    case 1:
                        message = _a.sent();
                        return [2 /*return*/, message];
                    case 2:
                        error_14 = _a.sent();
                        console.error("Error in chatroom:", error_14);
                        throw new Error(error_14.message);
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.slotAsign = function (userId, slotData) { return __awaiter(_this, void 0, void 0, function () {
            var existingSlot, data, error_15;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, slotsModel_1.default.findOne({
                                doctorId: slotData.doctorId,
                                userId: userId,
                                date: slotData.date,
                                startTime: slotData.startTime,
                                endTime: slotData.endTime,
                                booked: true,
                            })];
                    case 1:
                        existingSlot = _a.sent();
                        if (existingSlot) {
                            throw new Error("Slot already exists for this time range.");
                        }
                        return [4 /*yield*/, slotsModel_1.default.create({
                                doctorId: slotData.doctorId,
                                userId: userId,
                                date: slotData.date,
                                startTime: slotData.startTime,
                                endTime: slotData.endTime,
                                status: 'booked'
                            })];
                    case 2:
                        data = _a.sent();
                        if (!data) {
                            throw new Error("Doctor with ID ".concat(userId, " not found."));
                        }
                        return [2 /*return*/, {
                                _id: data._id.toString(),
                                date: data.date.toDateString(),
                                startTime: data.startTime,
                                doctorId: data.doctorId.toString(),
                                isBooked: data.booked,
                                endTime: data.endTime
                            }];
                    case 3:
                        error_15 = _a.sent();
                        console.error("Error in slot creation:", error_15);
                        throw new Error(error_15.message);
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.getcompleteAppointment = function (userId) { return __awaiter(_this, void 0, void 0, function () {
            var appointments, error_16;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (!userId) {
                            throw new Error("User with ID ".concat(userId, " not found."));
                        }
                        return [4 /*yield*/, appointmentModel_1.default.find({ userId: userId, status: 'completed' }).sort({ _id: -1 })
                                .populate('slotId')
                                .populate('doctorId')
                                .populate('patientId')
                                .populate('userId')];
                    case 1:
                        appointments = _a.sent();
                        return [2 /*return*/, appointments];
                    case 2:
                        error_16 = _a.sent();
                        console.error("Error in chatroom:", error_16);
                        throw new Error(error_16.message);
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.userReview = function (userId, Review) { return __awaiter(_this, void 0, void 0, function () {
            var data, error_17;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (!userId) {
                            throw new Error("User with ID ".concat(userId, " not found."));
                        }
                        if (!Review) {
                            throw new Error("Appointment with ID ".concat(Review, " not found."));
                        }
                        return [4 /*yield*/, reviewModel_1.default.create(__assign({ userId: userId }, Review))];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, {
                                reviewText: data === null || data === void 0 ? void 0 : data.reviewText,
                                rating: data === null || data === void 0 ? void 0 : data.rating,
                                createdAt: data === null || data === void 0 ? void 0 : data.createdAt.toString()
                            }];
                    case 2:
                        error_17 = _a.sent();
                        console.error("Error in chatroom:", error_17);
                        throw new Error(error_17.message);
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.googleLogin = function (GoogleUser) { return __awaiter(_this, void 0, void 0, function () {
            var users, user, error_18, field, value;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, userModel_1.default.updateOne({ email: GoogleUser.email }, {
                                $set: {
                                    username: GoogleUser.displayName,
                                    phone: 'Not Provider',
                                },
                            }, { upsert: true })];
                    case 1:
                        users = _a.sent();
                        return [4 /*yield*/, userModel_1.default.findOne({ email: GoogleUser.email })];
                    case 2:
                        user = _a.sent();
                        if (!user) {
                            throw new Error("User not found after upsert.");
                        }
                        return [2 /*return*/, {
                                _id: user._id.toString(),
                                username: user.username,
                                email: user.email,
                                profilePic: (user === null || user === void 0 ? void 0 : user.profilePic) || ''
                            }];
                    case 3:
                        error_18 = _a.sent();
                        console.error("Error adding user:", error_18);
                        if (error_18.code === 11000) {
                            field = Object.keys(error_18.keyValue)[0];
                            value = error_18.keyValue[field];
                            error_18.message = "".concat(field, " '").concat(value, "' already exists.");
                        }
                        throw new Error(error_18.message);
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.getReview = function (doctorId) { return __awaiter(_this, void 0, void 0, function () {
            var reviewDatas, error_19;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (!doctorId) {
                            throw new Error("User with ID ".concat(doctorId, " not found."));
                        }
                        return [4 /*yield*/, reviewModel_1.default.find({ doctorId: doctorId }).sort({ _id: -1 })
                                .populate('userId')];
                    case 1:
                        reviewDatas = _a.sent();
                        return [2 /*return*/, reviewDatas];
                    case 2:
                        error_19 = _a.sent();
                        console.error("Error in chatroom:", error_19);
                        throw new Error(error_19.message);
                    case 3: return [2 /*return*/];
                }
            });
        }); };
    }
    return UserRepository;
}());
exports.UserRepository = UserRepository;

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
exports.BookingRepository = void 0;
var doctorModel_1 = __importDefault(require("../models/doctorModel"));
var slotsModel_1 = __importDefault(require("../models/slotsModel"));
var patientModel_1 = __importDefault(require("../models/patientModel"));
var paymentModel_1 = __importDefault(require("../models/paymentModel"));
var appointmentModel_1 = __importDefault(require("../models/appointmentModel"));
var BookingRepository = /** @class */ (function () {
    function BookingRepository() {
        var _this = this;
        this.getDoctors = function (userId) { return __awaiter(_this, void 0, void 0, function () {
            var doctors, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (!userId) {
                            return [2 /*return*/, null];
                        }
                        return [4 /*yield*/, doctorModel_1.default.find({ isBlocked: false, isDeleted: false, isOtpVerified: true, isVerified: true })];
                    case 1:
                        doctors = _a.sent();
                        if (!doctors) {
                            throw new Error("Doctor with doctors not found.");
                        }
                        return [2 /*return*/, doctors];
                    case 2:
                        error_1 = _a.sent();
                        console.error("Error in slot creation:", error_1);
                        throw new Error(error_1.message);
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.doctorDetails = function (doctorId) { return __awaiter(_this, void 0, void 0, function () {
            var doctor, error_2;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, doctorModel_1.default.findOne({ _id: doctorId })];
                    case 1:
                        doctor = _c.sent();
                        if (!doctor) {
                            throw new Error("Doctor with doctor not found.");
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
                        error_2 = _c.sent();
                        console.error("Error in slot creation:", error_2);
                        throw new Error(error_2.message);
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getSlots = function (doctorId, userId) { return __awaiter(_this, void 0, void 0, function () {
            var slots, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, slotsModel_1.default.find({ doctorId: doctorId, status: 'confirmed' })];
                    case 1:
                        slots = _a.sent();
                        if (!slots) {
                            throw new Error("Doctor with doctor not found.");
                        }
                        return [2 /*return*/, slots];
                    case 2:
                        error_3 = _a.sent();
                        console.error("Error in slot creation:", error_3);
                        throw new Error(error_3.message);
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.bookingSlots = function (userId, doctorId, selectedSlots) { return __awaiter(_this, void 0, void 0, function () {
            var existingSlot, slots, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, slotsModel_1.default.findOne({ _id: selectedSlots })];
                    case 1:
                        existingSlot = _a.sent();
                        if (existingSlot && existingSlot.status === 'confirmed') {
                            return [2 /*return*/, {
                                    status: existingSlot.status,
                                    success: false,
                                    message: 'This slot is already booked.',
                                }];
                        }
                        return [4 /*yield*/, slotsModel_1.default.updateOne({ _id: selectedSlots, doctorId: doctorId }, { $set: { status: "booked", userId: userId } })];
                    case 2:
                        slots = _a.sent();
                        if (!slots) {
                            throw new Error("Doctor with slot not found.");
                        }
                        return [2 /*return*/, {
                                status: 'booked',
                                success: true,
                                message: 'slot status successfully change'
                            }];
                    case 3:
                        error_4 = _a.sent();
                        console.error("Error in slot creation:", error_4);
                        throw new Error(error_4.message);
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.patientDetails = function (userId, patientDetails) { return __awaiter(_this, void 0, void 0, function () {
            var patientDetail, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, patientModel_1.default.create(__assign({ userId: userId }, patientDetails))];
                    case 1:
                        patientDetail = _a.sent();
                        if (!patientDetail) {
                            throw new Error("Doctor with slot not found.");
                        }
                        return [2 /*return*/, {
                                _id: patientDetail === null || patientDetail === void 0 ? void 0 : patientDetail._id.toString(),
                                doctorId: patientDetail === null || patientDetail === void 0 ? void 0 : patientDetail.doctorId.toString(),
                                userId: patientDetail === null || patientDetail === void 0 ? void 0 : patientDetail.userId.toString(),
                                firstName: patientDetail === null || patientDetail === void 0 ? void 0 : patientDetail.firstName,
                                lastName: patientDetail === null || patientDetail === void 0 ? void 0 : patientDetail.lastName,
                                age: patientDetail === null || patientDetail === void 0 ? void 0 : patientDetail.age,
                                gender: patientDetail === null || patientDetail === void 0 ? void 0 : patientDetail.gender,
                                reason: patientDetail === null || patientDetail === void 0 ? void 0 : patientDetail.reason,
                                slotId: patientDetail === null || patientDetail === void 0 ? void 0 : patientDetail.slotId.toString(),
                            }];
                    case 2:
                        error_5 = _a.sent();
                        console.error("Error in slot creation:", error_5);
                        throw new Error(error_5.message);
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.paymentDetails = function (userId, PaymentData) { return __awaiter(_this, void 0, void 0, function () {
            var slotId, doctorId, txnid, amount, patientId, paymentDetail, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        slotId = PaymentData.slotId, doctorId = PaymentData.doctorId, txnid = PaymentData.txnid, amount = PaymentData.amount, patientId = PaymentData.patientId;
                        return [4 /*yield*/, paymentModel_1.default.create({
                                userId: userId,
                                slotId: slotId,
                                doctorId: doctorId,
                                transactionId: txnid,
                                amount: amount,
                                patientId: patientId
                            })];
                    case 1:
                        paymentDetail = _a.sent();
                        if (!paymentDetail) {
                            throw new Error("Doctor with slot not found.");
                        }
                        return [2 /*return*/, {
                                status: 'pending',
                                success: true,
                                message: 'slot status successfully change'
                            }];
                    case 2:
                        error_6 = _a.sent();
                        console.error("Error in slot creation:", error_6);
                        throw new Error(error_6.message);
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.paymentSuccess = function (userId, txnid) { return __awaiter(_this, void 0, void 0, function () {
            var payment, slotUpdate, paymentDetail, appointment, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, paymentModel_1.default.findOne({ transactionId: txnid })];
                    case 1:
                        payment = _a.sent();
                        return [4 /*yield*/, slotsModel_1.default.updateOne({ _id: payment === null || payment === void 0 ? void 0 : payment.slotId }, { status: 'confirmed', booked: true })];
                    case 2:
                        slotUpdate = _a.sent();
                        return [4 /*yield*/, paymentModel_1.default.updateOne({ transactionId: txnid }, { $set: { paymentStatus: 'completed' } })];
                    case 3:
                        paymentDetail = _a.sent();
                        return [4 /*yield*/, appointmentModel_1.default.create({
                                userId: userId,
                                slotId: payment === null || payment === void 0 ? void 0 : payment.slotId,
                                doctorId: payment === null || payment === void 0 ? void 0 : payment.doctorId,
                                patientId: payment === null || payment === void 0 ? void 0 : payment.patientId,
                                paymentId: payment === null || payment === void 0 ? void 0 : payment._id,
                            })];
                    case 4:
                        appointment = _a.sent();
                        if (!paymentDetail) {
                            throw new Error("Doctor with slot not found.");
                        }
                        return [2 /*return*/, {
                                status: 'completed',
                                success: true,
                                message: 'slot status successfully change'
                            }];
                    case 5:
                        error_7 = _a.sent();
                        console.error("Error in slot creation:", error_7);
                        throw new Error(error_7.message);
                    case 6: return [2 /*return*/];
                }
            });
        }); };
    }
    return BookingRepository;
}());
exports.BookingRepository = BookingRepository;

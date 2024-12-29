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
exports.AdminRepository = void 0;
var appointmentModel_1 = __importDefault(require("../models/appointmentModel"));
var doctorModel_1 = __importDefault(require("../models/doctorModel"));
var reviewModel_1 = __importDefault(require("../models/reviewModel"));
var userModel_1 = __importDefault(require("../models/userModel"));
var AdminRepository = /** @class */ (function () {
    function AdminRepository() {
        var _this = this;
        this.patientDetails = function (admin) { return __awaiter(_this, void 0, void 0, function () {
            var users, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (!admin) {
                            return [2 /*return*/, null];
                        }
                        return [4 /*yield*/, userModel_1.default.find({ isDelete: false })];
                    case 1:
                        users = _a.sent();
                        if (!users || users.length === 0) {
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/, users];
                    case 2:
                        error_1 = _a.sent();
                        console.error("Error finding users:", error_1.message);
                        return [2 /*return*/, null];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.isBlocked = function (email, userId) { return __awaiter(_this, void 0, void 0, function () {
            var user, updatedBlockStatus, updateResult, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        if (!userId) {
                            return [2 /*return*/, { success: false, message: "User ID is required" }];
                        }
                        return [4 /*yield*/, userModel_1.default.findOne({ _id: userId })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw new Error("User not found");
                        }
                        updatedBlockStatus = !user.isBlock;
                        return [4 /*yield*/, userModel_1.default.updateOne({ _id: userId }, { $set: { isBlock: updatedBlockStatus } })];
                    case 2:
                        updateResult = _a.sent();
                        if (updateResult.modifiedCount > 0) {
                            return [2 /*return*/, { success: true }];
                        }
                        else {
                            return [2 /*return*/, { success: false, message: "Failed to update block status" }];
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _a.sent();
                        console.error("Error finding or updating user:", error_2);
                        throw new Error("Unable to fetch users. Please try again later.");
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.isDelete = function (userId) { return __awaiter(_this, void 0, void 0, function () {
            var user, updatedStatus, updateResult, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        if (!userId) {
                            return [2 /*return*/, { success: false, message: "User ID is required" }];
                        }
                        return [4 /*yield*/, userModel_1.default.findOne({ _id: userId })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw new Error("User not found");
                        }
                        updatedStatus = !user.isDelete;
                        return [4 /*yield*/, userModel_1.default.updateOne({ _id: userId }, { $set: { isDelete: updatedStatus } })];
                    case 2:
                        updateResult = _a.sent();
                        if (updateResult.modifiedCount > 0) {
                            return [2 /*return*/, { success: true }];
                        }
                        else {
                            return [2 /*return*/, { success: false, message: "Failed to update block status" }];
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_3 = _a.sent();
                        console.error("Error finding or updating user:", error_3);
                        throw new Error("Unable to fetch users. Please try again later.");
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.isVerify = function (userId) { return __awaiter(_this, void 0, void 0, function () {
            var doctors, updatedStatus, updateResult, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        if (!userId) {
                            return [2 /*return*/, { success: false, message: "User ID is required" }];
                        }
                        return [4 /*yield*/, doctorModel_1.default.findOne({ _id: userId })];
                    case 1:
                        doctors = _a.sent();
                        if (!doctors) {
                            throw new Error("User not found");
                        }
                        console.log(doctors);
                        updatedStatus = !doctors.isVerified;
                        return [4 /*yield*/, doctorModel_1.default.updateOne({ _id: userId }, { $set: { isVerified: updatedStatus } })];
                    case 2:
                        updateResult = _a.sent();
                        if (updateResult.modifiedCount > 0) {
                            return [2 /*return*/, { success: true }];
                        }
                        else {
                            return [2 /*return*/, { success: false, message: "Failed to update block status" }];
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_4 = _a.sent();
                        console.error("Error finding or updating user:", error_4);
                        throw new Error("Unable to fetch users. Please try again later.");
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.doctorDetails = function (admin) { return __awaiter(_this, void 0, void 0, function () {
            var doctors, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (!admin) {
                            return [2 /*return*/, null];
                        }
                        console.log(admin);
                        return [4 /*yield*/, doctorModel_1.default.find({ isDeleted: false, isOtpVerified: true, isVerified: false })];
                    case 1:
                        doctors = _a.sent();
                        if (!doctors || doctors.length === 0) {
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/, doctors];
                    case 2:
                        error_5 = _a.sent();
                        console.error("Error finding users:", error_5.message);
                        return [2 /*return*/, null];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.verifiedDoctors = function (admin) { return __awaiter(_this, void 0, void 0, function () {
            var doctors, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (!admin) {
                            return [2 /*return*/, null];
                        }
                        return [4 /*yield*/, doctorModel_1.default.find({ isDeleted: false, isOtpVerified: true, isVerified: true })];
                    case 1:
                        doctors = _a.sent();
                        if (!doctors || doctors.length === 0) {
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/, doctors];
                    case 2:
                        error_6 = _a.sent();
                        console.error("Error finding users:", error_6.message);
                        return [2 /*return*/, null];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.doctorBlock = function (doctorId) { return __awaiter(_this, void 0, void 0, function () {
            var user, updatedBlockStatus, updateResult, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        if (!doctorId) {
                            return [2 /*return*/, { success: false, message: "User ID is required" }];
                        }
                        return [4 /*yield*/, doctorModel_1.default.findOne({ _id: doctorId })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw new Error("doctor not found");
                        }
                        updatedBlockStatus = !user.isBlocked;
                        return [4 /*yield*/, doctorModel_1.default.updateOne({ _id: doctorId }, { $set: { isBlocked: updatedBlockStatus } })];
                    case 2:
                        updateResult = _a.sent();
                        if (updateResult.modifiedCount > 0) {
                            return [2 /*return*/, { success: true }];
                        }
                        else {
                            return [2 /*return*/, { success: false, message: "Failed to update block status" }];
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_7 = _a.sent();
                        console.error("Error finding or updating user:", error_7);
                        throw new Error("Unable to fetch users. Please try again later.");
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.deleteDoctor = function (doctorId) { return __awaiter(_this, void 0, void 0, function () {
            var user, updatedStatus, updateResult, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        if (!doctorId) {
                            return [2 /*return*/, { success: false, message: "User ID is required" }];
                        }
                        return [4 /*yield*/, doctorModel_1.default.findOne({ _id: doctorId })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw new Error("User not found");
                        }
                        updatedStatus = !user.isDeleted;
                        return [4 /*yield*/, doctorModel_1.default.updateOne({ _id: doctorId }, { $set: { isDeleted: updatedStatus } })];
                    case 2:
                        updateResult = _a.sent();
                        if (updateResult.modifiedCount > 0) {
                            return [2 /*return*/, { success: true }];
                        }
                        else {
                            return [2 /*return*/, { success: false, message: "Failed to update block status" }];
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_8 = _a.sent();
                        console.error("Error finding or updating user:", error_8);
                        throw new Error("Unable to fetch users. Please try again later.");
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.getAppoinments = function (admin) { return __awaiter(_this, void 0, void 0, function () {
            var appointments, error_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (!admin) {
                            return [2 /*return*/, null];
                        }
                        return [4 /*yield*/, appointmentModel_1.default.find({ status: 'completed' }).sort({ _id: -1 })
                                .populate('slotId')
                                .populate('doctorId')
                                .populate('patientId')
                                .populate('userId')
                                .populate('paymentId')];
                    case 1:
                        appointments = _a.sent();
                        if (!appointments || appointments.length === 0) {
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/, appointments];
                    case 2:
                        error_9 = _a.sent();
                        console.error("Error finding appointments:", error_9.message);
                        return [2 /*return*/, null];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getReviews = function (admin) { return __awaiter(_this, void 0, void 0, function () {
            var reviews, error_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (!admin) {
                            return [2 /*return*/, null];
                        }
                        return [4 /*yield*/, reviewModel_1.default.find().sort({ _id: -1 })
                                .populate('doctorId')
                                .populate('userId')];
                    case 1:
                        reviews = _a.sent();
                        if (!reviews || reviews.length === 0) {
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/, reviews];
                    case 2:
                        error_10 = _a.sent();
                        console.error("Error finding appointments:", error_10.message);
                        return [2 /*return*/, null];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.deleteReviews = function (review) { return __awaiter(_this, void 0, void 0, function () {
            var user, error_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (!review) {
                            return [2 /*return*/, { success: false, message: "User ID is required" }];
                        }
                        console.log(review);
                        return [4 /*yield*/, reviewModel_1.default.deleteOne({ _id: review })];
                    case 1:
                        user = _a.sent();
                        return [2 /*return*/, { success: true }];
                    case 2:
                        error_11 = _a.sent();
                        console.error("Error finding or updating user:", error_11);
                        throw new Error("Unable to fetch users. Please try again later.");
                    case 3: return [2 /*return*/];
                }
            });
        }); };
    }
    return AdminRepository;
}());
exports.AdminRepository = AdminRepository;

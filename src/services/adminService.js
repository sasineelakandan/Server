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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
var constant_1 = require("../utils/constant");
var generateJWT_1 = require("../utils/generateJWT");
var AdminService = /** @class */ (function () {
    function AdminService(adminRepository) {
        var _this = this;
        this.adminLogin = function (email, password) { return __awaiter(_this, void 0, void 0, function () {
            var envEmail, envPassword, accessToken, refreshToken;
            return __generator(this, function (_a) {
                try {
                    envEmail = constant_1.ADMIN_EMAIL;
                    envPassword = constant_1.ADMIN_PASSWORD;
                    if (!envEmail || !envPassword) {
                        throw new Error("Environment variables for email or password are not set");
                    }
                    if (email === envEmail && password === envPassword) {
                        accessToken = (0, generateJWT_1.generateAccessToken)(envEmail, "admin");
                        refreshToken = (0, generateJWT_1.generateRefreshToken)(envEmail, "admin");
                        return [2 /*return*/, { admin: true, accessToken: accessToken, refreshToken: refreshToken }];
                    }
                    else {
                        return [2 /*return*/, { admin: false }];
                    }
                }
                catch (error) {
                    console.log("Error in user service", error.message);
                    throw new Error(error.message);
                }
                return [2 /*return*/];
            });
        }); };
        this.patientDetails = function (admin) { return __awaiter(_this, void 0, void 0, function () {
            var users, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (!admin) {
                            // If no admin identifier is provided, return null or an empty object
                            return [2 /*return*/, null];
                        }
                        return [4 /*yield*/, this.adminRepository.patientDetails(admin)];
                    case 1:
                        users = _a.sent();
                        if (!users) {
                            // Return null if no user details are found
                            return [2 /*return*/, null];
                        }
                        // Return the fetched user data
                        return [2 /*return*/, users];
                    case 2:
                        error_1 = _a.sent();
                        console.log("Error in user service:", error_1.message);
                        return [2 /*return*/, null];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.isBlocked = function (email, userId) { return __awaiter(_this, void 0, void 0, function () {
            var users, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (!email) {
                            return [2 /*return*/, { success: false, message: "Email is required" }];
                        }
                        return [4 /*yield*/, this.adminRepository.isBlocked(email, userId)];
                    case 1:
                        users = _a.sent();
                        if (!users) {
                            return [2 /*return*/, { success: false, message: "User not found or error fetching data" }];
                        }
                        return [2 /*return*/, { success: true, message: "User block status fetched successfully" }];
                    case 2:
                        error_2 = _a.sent();
                        console.log("Error in user service", error_2.message);
                        return [2 /*return*/, { success: false, message: "Error: ".concat(error_2.message) }]; // Return error message
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.isDelete = function (userId) { return __awaiter(_this, void 0, void 0, function () {
            var users, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (!userId) {
                            return [2 /*return*/, { success: false, message: "userId is required" }];
                        }
                        return [4 /*yield*/, this.adminRepository.isDelete(userId)];
                    case 1:
                        users = _a.sent();
                        if (!users) {
                            return [2 /*return*/, { success: false, message: "User not found or error fetching data" }];
                        }
                        return [2 /*return*/, { success: true, message: "User block status fetched successfully" }];
                    case 2:
                        error_3 = _a.sent();
                        console.log("Error in user service", error_3.message);
                        return [2 /*return*/, { success: false, message: "Error: ".concat(error_3.message) }]; // Return error message
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.isVerify = function (userId) { return __awaiter(_this, void 0, void 0, function () {
            var users, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (!userId) {
                            return [2 /*return*/, { success: false, message: "userId is required" }];
                        }
                        return [4 /*yield*/, this.adminRepository.isVerify(userId)];
                    case 1:
                        users = _a.sent();
                        if (!users) {
                            return [2 /*return*/, { success: false, message: "User not found or error fetching data" }];
                        }
                        return [2 /*return*/, { success: true, message: "User block status fetched successfully" }];
                    case 2:
                        error_4 = _a.sent();
                        console.log("Error in user service", error_4.message);
                        return [2 /*return*/, { success: false, message: "Error: ".concat(error_4.message) }]; // Return error message
                    case 3: return [2 /*return*/];
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
                        return [4 /*yield*/, this.adminRepository.doctorDetails(admin)];
                    case 1:
                        doctors = _a.sent();
                        if (!doctors) {
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/, doctors];
                    case 2:
                        error_5 = _a.sent();
                        console.log("Error in user service:", error_5.message);
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
                        return [4 /*yield*/, this.adminRepository.verifiedDoctors(admin)];
                    case 1:
                        doctors = _a.sent();
                        if (!doctors) {
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/, doctors];
                    case 2:
                        error_6 = _a.sent();
                        console.log("Error in user service:", error_6.message);
                        return [2 /*return*/, null];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.doctorBlock = function (doctorId) { return __awaiter(_this, void 0, void 0, function () {
            var users, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.adminRepository.doctorBlock(doctorId)];
                    case 1:
                        users = _a.sent();
                        if (!users) {
                            return [2 /*return*/, { success: false, message: "User not found or error fetching data" }];
                        }
                        return [2 /*return*/, { success: true, message: "User block status fetched successfully" }];
                    case 2:
                        error_7 = _a.sent();
                        console.log("Error in user service", error_7.message);
                        return [2 /*return*/, { success: false, message: "Error: ".concat(error_7.message) }]; // Return error message
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.deleteDoctor = function (doctorId) { return __awaiter(_this, void 0, void 0, function () {
            var doctor, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (!doctorId) {
                            return [2 /*return*/, { success: false, message: "userId is required" }];
                        }
                        return [4 /*yield*/, this.adminRepository.deleteDoctor(doctorId)];
                    case 1:
                        doctor = _a.sent();
                        if (!doctor) {
                            return [2 /*return*/, { success: false, message: "User not found or error fetching data" }];
                        }
                        return [2 /*return*/, { success: true, message: "User block status fetched successfully" }];
                    case 2:
                        error_8 = _a.sent();
                        console.log("Error in user service", error_8.message);
                        return [2 /*return*/, { success: false, message: "Error: ".concat(error_8.message) }];
                    case 3: return [2 /*return*/];
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
                        return [4 /*yield*/, this.adminRepository.getAppoinments(admin)];
                    case 1:
                        appointments = _a.sent();
                        if (!appointments) {
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/, appointments];
                    case 2:
                        error_9 = _a.sent();
                        console.log("Error in user service:", error_9.message);
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
                            console.warn("Admin identifier is required but not provided.");
                            return [2 /*return*/, null];
                        }
                        return [4 /*yield*/, this.adminRepository.getReviews(admin)];
                    case 1:
                        reviews = _a.sent();
                        if (!reviews) {
                            console.info("No reviews found for admin: ".concat(admin));
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/, reviews];
                    case 2:
                        error_10 = _a.sent();
                        console.error("Error in getReviews service:", error_10.message);
                        return [2 /*return*/, null]; // Or rethrow the error with `throw error;` if needed
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.deleteReviews = function (review) { return __awaiter(_this, void 0, void 0, function () {
            var users, error_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (!review) {
                            return [2 /*return*/, { success: false, message: "reviewId is required" }];
                        }
                        return [4 /*yield*/, this.adminRepository.deleteReviews(review)];
                    case 1:
                        users = _a.sent();
                        if (!users) {
                            return [2 /*return*/, { success: false, message: "User not found or error fetching data" }];
                        }
                        return [2 /*return*/, { success: true, message: "User block status fetched successfully" }];
                    case 2:
                        error_11 = _a.sent();
                        console.log("Error in user service", error_11.message);
                        return [2 /*return*/, { success: false, message: "Error: ".concat(error_11.message) }]; // Return error message
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.adminRepository = adminRepository;
    }
    return AdminService;
}());
exports.AdminService = AdminService;

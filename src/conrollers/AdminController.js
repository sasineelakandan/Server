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
exports.AdminController = void 0;
var AdminController = /** @class */ (function () {
    function AdminController(adminService) {
        var _this = this;
        this.adminLogin = function (httpRequest) { return __awaiter(_this, void 0, void 0, function () {
            var _a, email, password, admin, accessToken, refreshToken, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = httpRequest.body, email = _a.email, password = _a.password;
                        return [4 /*yield*/, this.adminService.adminLogin(email, password)];
                    case 1:
                        admin = _b.sent();
                        console.log(admin);
                        if (admin.admin == false) {
                            return [2 /*return*/, {
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    statusCode: 401,
                                    body: {
                                        error: "Invalid email or password",
                                    },
                                }];
                        }
                        accessToken = admin.accessToken, refreshToken = admin.refreshToken;
                        return [2 /*return*/, {
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                statusCode: 200,
                                body: __assign(__assign({}, admin), { accessToken: accessToken, refreshToken: refreshToken }),
                            }];
                    case 2:
                        e_1 = _b.sent();
                        console.error("Error in adminLogin:", e_1);
                        return [2 /*return*/, {
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                statusCode: e_1.statusCode || 500,
                                body: {
                                    error: e_1.message || "An unexpected error occurred",
                                },
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.patientDetails = function (httpRequest) { return __awaiter(_this, void 0, void 0, function () {
            var admin, users, e_2;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        admin = (_a = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.user) === null || _a === void 0 ? void 0 : _a.id;
                        if (!admin) {
                            return [2 /*return*/, {
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    statusCode: 401,
                                    body: {
                                        error: "Invalid email or password",
                                    },
                                }];
                        }
                        return [4 /*yield*/, this.adminService.patientDetails(admin)];
                    case 1:
                        users = _b.sent();
                        return [2 /*return*/, {
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                statusCode: 200,
                                body: users
                            }];
                    case 2:
                        e_2 = _b.sent();
                        console.error("Error in adminLogin:", e_2);
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
        this.isBlocked = function (httpRequest) { return __awaiter(_this, void 0, void 0, function () {
            var email, userId, user, e_3;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        email = (_a = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.user) === null || _a === void 0 ? void 0 : _a.id;
                        userId = (httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.body).userId;
                        console.log(email, userId);
                        if (!email) {
                            throw new Error("Email is required but was not provided.");
                        }
                        return [4 /*yield*/, this.adminService.isBlocked(email, userId)];
                    case 1:
                        user = _b.sent();
                        return [2 /*return*/, {
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                statusCode: 200,
                                body: user
                            }];
                    case 2:
                        e_3 = _b.sent();
                        console.error("Error in adminLogin:", e_3);
                        return [2 /*return*/, {
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                statusCode: e_3.statusCode || 500,
                                body: {
                                    error: e_3.message || "An unexpected error occurred",
                                },
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.isDelete = function (httpRequest) { return __awaiter(_this, void 0, void 0, function () {
            var userId, user, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        userId = (httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.query).userId;
                        console.log(userId);
                        if (!userId || typeof userId !== 'string') {
                            throw new Error("userId is required and must be a string.");
                        }
                        return [4 /*yield*/, this.adminService.isDelete(userId)];
                    case 1:
                        user = _a.sent();
                        return [2 /*return*/, {
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                statusCode: 200,
                                body: user
                            }];
                    case 2:
                        e_4 = _a.sent();
                        console.error("Error in adminLogin:", e_4);
                        return [2 /*return*/, {
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                statusCode: e_4.statusCode || 500,
                                body: {
                                    error: e_4.message || "An unexpected error occurred",
                                },
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.isVerify = function (httpRequest) { return __awaiter(_this, void 0, void 0, function () {
            var userId, doctor, e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        userId = (httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.body).userId;
                        console.log(userId);
                        if (!userId || typeof userId !== 'string') {
                            throw new Error("userId is required and must be a string.");
                        }
                        return [4 /*yield*/, this.adminService.isVerify(userId)];
                    case 1:
                        doctor = _a.sent();
                        return [2 /*return*/, {
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                statusCode: 200,
                                body: doctor
                            }];
                    case 2:
                        e_5 = _a.sent();
                        console.error("Error in adminLogin:", e_5);
                        return [2 /*return*/, {
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                statusCode: e_5.statusCode || 500,
                                body: {
                                    error: e_5.message || "An unexpected error occurred",
                                },
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.doctorDetails = function (httpRequest) { return __awaiter(_this, void 0, void 0, function () {
            var admin, doctors, e_6;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        admin = (_a = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.user) === null || _a === void 0 ? void 0 : _a.id;
                        if (!admin) {
                            return [2 /*return*/, {
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    statusCode: 401,
                                    body: {
                                        error: "Invalid authentication",
                                    },
                                }];
                        }
                        return [4 /*yield*/, this.adminService.doctorDetails(admin)];
                    case 1:
                        doctors = _b.sent();
                        console.log(doctors);
                        return [2 /*return*/, {
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                statusCode: 200,
                                body: doctors
                            }];
                    case 2:
                        e_6 = _b.sent();
                        console.error("Error in adminLogin:", e_6);
                        return [2 /*return*/, {
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                statusCode: e_6.statusCode || 500,
                                body: {
                                    error: e_6.message || "An unexpected error occurred",
                                },
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.verifiedDoctors = function (httpRequest) { return __awaiter(_this, void 0, void 0, function () {
            var admin, doctors, e_7;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        admin = (_a = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.user) === null || _a === void 0 ? void 0 : _a.id;
                        if (!admin) {
                            return [2 /*return*/, {
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    statusCode: 401,
                                    body: {
                                        error: "Invalid authentication",
                                    },
                                }];
                        }
                        return [4 /*yield*/, this.adminService.verifiedDoctors(admin)];
                    case 1:
                        doctors = _b.sent();
                        return [2 /*return*/, {
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                statusCode: 200,
                                body: doctors
                            }];
                    case 2:
                        e_7 = _b.sent();
                        console.error("Error in adminLogin:", e_7);
                        return [2 /*return*/, {
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                statusCode: e_7.statusCode || 500,
                                body: {
                                    error: e_7.message || "An unexpected error occurred",
                                },
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.blockDoctor = function (httpRequest) { return __awaiter(_this, void 0, void 0, function () {
            var doctorId, doctors, e_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        doctorId = (httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.body).doctorId;
                        if (!doctorId) {
                            return [2 /*return*/, {
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    statusCode: 401,
                                    body: {
                                        error: "Doctor Id is missing",
                                    },
                                }];
                        }
                        return [4 /*yield*/, this.adminService.doctorBlock(doctorId)];
                    case 1:
                        doctors = _a.sent();
                        return [2 /*return*/, {
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                statusCode: 200,
                                body: doctors
                            }];
                    case 2:
                        e_8 = _a.sent();
                        console.error("Error in adminLogin:", e_8);
                        return [2 /*return*/, {
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                statusCode: e_8.statusCode || 500,
                                body: {
                                    error: e_8.message || "An unexpected error occurred",
                                },
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.deleteDoctor = function (httpRequest) { return __awaiter(_this, void 0, void 0, function () {
            var doctorId, user, e_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        doctorId = (httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.query).doctorId;
                        console.log(doctorId);
                        if (!doctorId || typeof doctorId !== 'string') {
                            throw new Error("userId is required and must be a string.");
                        }
                        return [4 /*yield*/, this.adminService.deleteDoctor(doctorId)];
                    case 1:
                        user = _a.sent();
                        return [2 /*return*/, {
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                statusCode: 200,
                                body: user
                            }];
                    case 2:
                        e_9 = _a.sent();
                        console.error("Error in adminLogin:", e_9);
                        return [2 /*return*/, {
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                statusCode: e_9.statusCode || 500,
                                body: {
                                    error: e_9.message || "An unexpected error occurred",
                                },
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getAppointments = function (httpRequest) { return __awaiter(_this, void 0, void 0, function () {
            var admin, appointments, e_10;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        admin = (_a = httpRequest.user) === null || _a === void 0 ? void 0 : _a.id;
                        if (!admin || typeof admin !== 'string') {
                            throw new Error("userId is required and must be a string.");
                        }
                        return [4 /*yield*/, this.adminService.getAppoinments(admin)];
                    case 1:
                        appointments = _b.sent();
                        return [2 /*return*/, {
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                statusCode: 200,
                                body: appointments
                            }];
                    case 2:
                        e_10 = _b.sent();
                        console.error("Error in adminLogin:", e_10);
                        return [2 /*return*/, {
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                statusCode: e_10.statusCode || 500,
                                body: {
                                    error: e_10.message || "An unexpected error occurred",
                                },
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getReviews = function (httpRequest) { return __awaiter(_this, void 0, void 0, function () {
            var admin, reviews, e_11;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        admin = (_a = httpRequest.user) === null || _a === void 0 ? void 0 : _a.id;
                        if (!admin || typeof admin !== 'string') {
                            throw new Error("userId is required and must be a string.");
                        }
                        return [4 /*yield*/, this.adminService.getReviews(admin)];
                    case 1:
                        reviews = _b.sent();
                        return [2 /*return*/, {
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                statusCode: 200,
                                body: reviews
                            }];
                    case 2:
                        e_11 = _b.sent();
                        console.error("Error in adminLogin:", e_11);
                        return [2 /*return*/, {
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                statusCode: e_11.statusCode || 500,
                                body: {
                                    error: e_11.message || "An unexpected error occurred",
                                },
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.deleteReview = function (httpRequest) { return __awaiter(_this, void 0, void 0, function () {
            var reviewId, deleteReview, e_12;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        reviewId = (_a = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.query) === null || _a === void 0 ? void 0 : _a.reviewId;
                        if (!reviewId) {
                            return [2 /*return*/, {
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    statusCode: 400,
                                    body: {
                                        error: "Review ID is missing.",
                                    },
                                }];
                        }
                        if (typeof reviewId !== 'string') {
                            return [2 /*return*/, {
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    statusCode: 400,
                                    body: {
                                        error: "Review ID must be a string.",
                                    },
                                }];
                        }
                        return [4 /*yield*/, this.adminService.deleteReviews(reviewId)];
                    case 1:
                        deleteReview = _b.sent();
                        return [2 /*return*/, {
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                statusCode: 200,
                                body: {
                                    message: "Review deleted successfully.",
                                    reviewId: reviewId,
                                },
                            }];
                    case 2:
                        e_12 = _b.sent();
                        console.error("Error in deleteReview:", e_12);
                        return [2 /*return*/, {
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                statusCode: e_12.statusCode || 500,
                                body: {
                                    error: e_12.message || "An unexpected error occurred.",
                                },
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.adminService = adminService;
    }
    return AdminController;
}());
exports.AdminController = AdminController;

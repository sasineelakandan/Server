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
exports.BookingController = void 0;
var console_1 = require("console");
var BookingController = /** @class */ (function () {
    function BookingController(bookingService) {
        var _this = this;
        this.getDoctors = function (httpRequest) { return __awaiter(_this, void 0, void 0, function () {
            var userId, doctors, e_1;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        userId = (_a = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.user) === null || _a === void 0 ? void 0 : _a.id;
                        if (!userId) {
                            throw (0, console_1.error)('userId not found');
                        }
                        return [4 /*yield*/, this.bookingService.getDoctors(userId)];
                    case 1:
                        doctors = _b.sent();
                        return [2 /*return*/, {
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                statusCode: 200,
                                body: doctors,
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
        this.doctorDetails = function (httpRequest) { return __awaiter(_this, void 0, void 0, function () {
            var userId, doctorId, doctor, e_2;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        userId = (_a = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.user) === null || _a === void 0 ? void 0 : _a.id;
                        doctorId = (httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.body).doctorId;
                        if (!userId) {
                            throw (0, console_1.error)('userId not found');
                        }
                        return [4 /*yield*/, this.bookingService.doctorDetails(doctorId)];
                    case 1:
                        doctor = _b.sent();
                        return [2 /*return*/, {
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                statusCode: 200,
                                body: doctor,
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
        this.getSlots = function (httpRequest) { return __awaiter(_this, void 0, void 0, function () {
            var userId, doctorId, slots, e_3;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        userId = (_a = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.user) === null || _a === void 0 ? void 0 : _a.id;
                        doctorId = (httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.body).doctorId;
                        if (!userId) {
                            throw (0, console_1.error)('userId not found');
                        }
                        if (!doctorId) {
                            throw (0, console_1.error)('doctorId not found');
                        }
                        return [4 /*yield*/, this.bookingService.getSlots(doctorId, userId)];
                    case 1:
                        slots = _b.sent();
                        return [2 /*return*/, {
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                statusCode: 200,
                                body: slots,
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
        this.bookingSlots = function (httpRequest) { return __awaiter(_this, void 0, void 0, function () {
            var userId, _a, doctorId, selectedSlot, slotStatus, e_4;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        userId = (_b = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.user) === null || _b === void 0 ? void 0 : _b.id;
                        if (!userId) {
                            throw (0, console_1.error)('user unauthorized');
                        }
                        _a = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.body, doctorId = _a.doctorId, selectedSlot = _a.selectedSlot;
                        console.log(selectedSlot);
                        if (!doctorId) {
                            throw (0, console_1.error)('doctorId not found');
                        }
                        return [4 /*yield*/, this.bookingService.bookingSlots(userId, doctorId, selectedSlot)];
                    case 1:
                        slotStatus = _c.sent();
                        return [2 /*return*/, {
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                statusCode: 200,
                                body: slotStatus,
                            }];
                    case 2:
                        e_4 = _c.sent();
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
        this.patientDetails = function (httpRequest) { return __awaiter(_this, void 0, void 0, function () {
            var userId, patientDetails, Patient, e_5;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        userId = (_a = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.user) === null || _a === void 0 ? void 0 : _a.id;
                        patientDetails = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.body;
                        if (!userId) {
                            throw (0, console_1.error)('user unauthorized');
                        }
                        return [4 /*yield*/, this.bookingService.patientDetails(userId, patientDetails)];
                    case 1:
                        Patient = _b.sent();
                        return [2 /*return*/, {
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                statusCode: 200,
                                body: Patient,
                            }];
                    case 2:
                        e_5 = _b.sent();
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
        this.paymentDetails = function (httpRequest) { return __awaiter(_this, void 0, void 0, function () {
            var userId, paymentDetails, payment, e_6;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        userId = (_a = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.user) === null || _a === void 0 ? void 0 : _a.id;
                        paymentDetails = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.body;
                        if (!userId) {
                            throw (0, console_1.error)('user unauthorized');
                        }
                        return [4 /*yield*/, this.bookingService.paymentDetails(userId, paymentDetails)];
                    case 1:
                        payment = _b.sent();
                        return [2 /*return*/, {
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                statusCode: 200,
                                body: payment,
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
        this.PaymentSucess = function (httpRequest) { return __awaiter(_this, void 0, void 0, function () {
            var productinfo, txnid, payment, e_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        productinfo = (httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.body).productinfo;
                        txnid = (httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.body).txnid;
                        return [4 /*yield*/, this.bookingService.paymentSuccess(productinfo, txnid)];
                    case 1:
                        payment = _a.sent();
                        return [2 /*return*/, {
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                statusCode: 200,
                                body: payment,
                            }];
                    case 2:
                        e_7 = _a.sent();
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
        this.bookingService = bookingService;
    }
    return BookingController;
}());
exports.BookingController = BookingController;

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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingController = void 0;
const console_1 = require("console");
class BookingController {
    constructor(bookingService) {
        this.getDoctors = (httpRequest) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.user) === null || _a === void 0 ? void 0 : _a.id;
                if (!userId) {
                    throw (0, console_1.error)('userId not found');
                }
                const doctors = yield this.bookingService.getDoctors(userId);
                return {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    statusCode: 200,
                    body: doctors,
                };
            }
            catch (e) {
                console.error("Error in adminLogin:", e);
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
        this.doctorDetails = (httpRequest) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.user) === null || _a === void 0 ? void 0 : _a.id;
                const { doctorId } = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.body;
                if (!userId) {
                    throw (0, console_1.error)('userId not found');
                }
                const doctor = yield this.bookingService.doctorDetails(doctorId);
                return {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    statusCode: 200,
                    body: doctor,
                };
            }
            catch (e) {
                console.error("Error in adminLogin:", e);
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
        this.getSlots = (httpRequest) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.user) === null || _a === void 0 ? void 0 : _a.id;
                const { doctorId } = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.body;
                if (!userId) {
                    throw (0, console_1.error)('userId not found');
                }
                if (!doctorId) {
                    throw (0, console_1.error)('doctorId not found');
                }
                const slots = yield this.bookingService.getSlots(doctorId, userId);
                return {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    statusCode: 200,
                    body: slots,
                };
            }
            catch (e) {
                console.error("Error in adminLogin:", e);
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
        this.bookingSlots = (httpRequest) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.user) === null || _a === void 0 ? void 0 : _a.id;
                if (!userId) {
                    throw (0, console_1.error)('user unauthorized');
                }
                const { doctorId, selectedSlot } = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.body;
                console.log(selectedSlot);
                if (!doctorId) {
                    throw (0, console_1.error)('doctorId not found');
                }
                const slotStatus = yield this.bookingService.bookingSlots(userId, doctorId, selectedSlot);
                return {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    statusCode: 200,
                    body: slotStatus,
                };
            }
            catch (e) {
                console.error("Error in adminLogin:", e);
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
        this.patientDetails = (httpRequest) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.user) === null || _a === void 0 ? void 0 : _a.id;
                const patientDetails = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.body;
                if (!userId) {
                    throw (0, console_1.error)('user unauthorized');
                }
                const Patient = yield this.bookingService.patientDetails(userId, patientDetails);
                return {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    statusCode: 200,
                    body: Patient,
                };
            }
            catch (e) {
                console.error("Error in adminLogin:", e);
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
        this.paymentDetails = (httpRequest) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.user) === null || _a === void 0 ? void 0 : _a.id;
                const paymentDetails = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.body;
                if (!userId) {
                    throw (0, console_1.error)('user unauthorized');
                }
                const payment = yield this.bookingService.paymentDetails(userId, paymentDetails);
                return {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    statusCode: 200,
                    body: payment,
                };
            }
            catch (e) {
                console.error("Error in adminLogin:", e);
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
        this.PaymentSucess = (httpRequest) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { productinfo } = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.body;
                const { txnid } = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.body;
                const payment = yield this.bookingService.paymentSuccess(productinfo, txnid);
                return {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    statusCode: 200,
                    body: payment,
                };
            }
            catch (e) {
                console.error("Error in adminLogin:", e);
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
        this.bookingService = bookingService;
    }
}
exports.BookingController = BookingController;

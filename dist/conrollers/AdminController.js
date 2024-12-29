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
exports.AdminController = void 0;
class AdminController {
    constructor(adminService) {
        this.adminLogin = (httpRequest) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = httpRequest.body;
                const admin = yield this.adminService.adminLogin(email, password);
                console.log(admin);
                if (admin.admin == false) {
                    return {
                        headers: {
                            "Content-Type": "application/json",
                        },
                        statusCode: 401,
                        body: {
                            error: "Invalid email or password",
                        },
                    };
                }
                const { accessToken, refreshToken } = admin;
                return {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    statusCode: 200,
                    body: Object.assign(Object.assign({}, admin), { accessToken, refreshToken }),
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
                const admin = (_a = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.user) === null || _a === void 0 ? void 0 : _a.id;
                if (!admin) {
                    return {
                        headers: {
                            "Content-Type": "application/json",
                        },
                        statusCode: 401,
                        body: {
                            error: "Invalid email or password",
                        },
                    };
                }
                const users = yield this.adminService.patientDetails(admin);
                return {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    statusCode: 200,
                    body: users
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
        this.isBlocked = (httpRequest) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const email = (_a = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.user) === null || _a === void 0 ? void 0 : _a.id;
                const { userId } = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.body;
                console.log(email, userId);
                if (!email) {
                    throw new Error("Email is required but was not provided.");
                }
                const user = yield this.adminService.isBlocked(email, userId);
                return {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    statusCode: 200,
                    body: user
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
        this.isDelete = (httpRequest) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.query;
                console.log(userId);
                if (!userId || typeof userId !== 'string') {
                    throw new Error("userId is required and must be a string.");
                }
                const user = yield this.adminService.isDelete(userId);
                return {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    statusCode: 200,
                    body: user
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
        this.isVerify = (httpRequest) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.body;
                console.log(userId);
                if (!userId || typeof userId !== 'string') {
                    throw new Error("userId is required and must be a string.");
                }
                const doctor = yield this.adminService.isVerify(userId);
                return {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    statusCode: 200,
                    body: doctor
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
                const admin = (_a = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.user) === null || _a === void 0 ? void 0 : _a.id;
                if (!admin) {
                    return {
                        headers: {
                            "Content-Type": "application/json",
                        },
                        statusCode: 401,
                        body: {
                            error: "Invalid authentication",
                        },
                    };
                }
                const doctors = yield this.adminService.doctorDetails(admin);
                console.log(doctors);
                return {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    statusCode: 200,
                    body: doctors
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
        this.verifiedDoctors = (httpRequest) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const admin = (_a = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.user) === null || _a === void 0 ? void 0 : _a.id;
                if (!admin) {
                    return {
                        headers: {
                            "Content-Type": "application/json",
                        },
                        statusCode: 401,
                        body: {
                            error: "Invalid authentication",
                        },
                    };
                }
                const doctors = yield this.adminService.verifiedDoctors(admin);
                return {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    statusCode: 200,
                    body: doctors
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
        this.blockDoctor = (httpRequest) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { doctorId } = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.body;
                if (!doctorId) {
                    return {
                        headers: {
                            "Content-Type": "application/json",
                        },
                        statusCode: 401,
                        body: {
                            error: "Doctor Id is missing",
                        },
                    };
                }
                const doctors = yield this.adminService.doctorBlock(doctorId);
                return {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    statusCode: 200,
                    body: doctors
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
        this.deleteDoctor = (httpRequest) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { doctorId } = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.query;
                console.log(doctorId);
                if (!doctorId || typeof doctorId !== 'string') {
                    throw new Error("userId is required and must be a string.");
                }
                const user = yield this.adminService.deleteDoctor(doctorId);
                return {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    statusCode: 200,
                    body: user
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
        this.getAppointments = (httpRequest) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const admin = (_a = httpRequest.user) === null || _a === void 0 ? void 0 : _a.id;
                if (!admin || typeof admin !== 'string') {
                    throw new Error("userId is required and must be a string.");
                }
                const appointments = yield this.adminService.getAppoinments(admin);
                return {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    statusCode: 200,
                    body: appointments
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
        this.getReviews = (httpRequest) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            {
                try {
                    const admin = (_a = httpRequest.user) === null || _a === void 0 ? void 0 : _a.id;
                    if (!admin || typeof admin !== 'string') {
                        throw new Error("userId is required and must be a string.");
                    }
                    const reviews = yield this.adminService.getReviews(admin);
                    return {
                        headers: {
                            "Content-Type": "application/json",
                        },
                        statusCode: 200,
                        body: reviews
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
            }
        });
        this.deleteReview = (httpRequest) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const reviewId = (_a = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.query) === null || _a === void 0 ? void 0 : _a.reviewId;
                if (!reviewId) {
                    return {
                        headers: {
                            "Content-Type": "application/json",
                        },
                        statusCode: 400,
                        body: {
                            error: "Review ID is missing.",
                        },
                    };
                }
                if (typeof reviewId !== 'string') {
                    return {
                        headers: {
                            "Content-Type": "application/json",
                        },
                        statusCode: 400,
                        body: {
                            error: "Review ID must be a string.",
                        },
                    };
                }
                const deleteReview = yield this.adminService.deleteReviews(reviewId);
                return {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    statusCode: 200,
                    body: {
                        message: "Review deleted successfully.",
                        reviewId,
                    },
                };
            }
            catch (e) {
                console.error("Error in deleteReview:", e);
                return {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    statusCode: e.statusCode || 500,
                    body: {
                        error: e.message || "An unexpected error occurred.",
                    },
                };
            }
        });
        this.adminService = adminService;
    }
}
exports.AdminController = AdminController;

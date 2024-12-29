export class AdminController {
    constructor(adminService) {
        this.adminLogin = async (httpRequest) => {
            try {
                const { email, password } = httpRequest.body;
                const admin = await this.adminService.adminLogin(email, password);
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
                    body: { ...admin, accessToken, refreshToken },
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
        };
        this.patientDetails = async (httpRequest) => {
            try {
                const admin = httpRequest?.user?.id;
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
                const users = await this.adminService.patientDetails(admin);
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
        };
        this.isBlocked = async (httpRequest) => {
            try {
                const email = httpRequest?.user?.id;
                const { userId } = httpRequest?.body;
                console.log(email, userId);
                if (!email) {
                    throw new Error("Email is required but was not provided.");
                }
                const user = await this.adminService.isBlocked(email, userId);
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
        };
        this.isDelete = async (httpRequest) => {
            try {
                const { userId } = httpRequest?.query;
                console.log(userId);
                if (!userId || typeof userId !== 'string') {
                    throw new Error("userId is required and must be a string.");
                }
                const user = await this.adminService.isDelete(userId);
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
        };
        this.isVerify = async (httpRequest) => {
            try {
                const { userId } = httpRequest?.body;
                console.log(userId);
                if (!userId || typeof userId !== 'string') {
                    throw new Error("userId is required and must be a string.");
                }
                const doctor = await this.adminService.isVerify(userId);
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
        };
        this.doctorDetails = async (httpRequest) => {
            try {
                const admin = httpRequest?.user?.id;
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
                const doctors = await this.adminService.doctorDetails(admin);
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
        };
        this.verifiedDoctors = async (httpRequest) => {
            try {
                const admin = httpRequest?.user?.id;
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
                const doctors = await this.adminService.verifiedDoctors(admin);
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
        };
        this.blockDoctor = async (httpRequest) => {
            try {
                const { doctorId } = httpRequest?.body;
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
                const doctors = await this.adminService.doctorBlock(doctorId);
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
        };
        this.deleteDoctor = async (httpRequest) => {
            try {
                const { doctorId } = httpRequest?.query;
                console.log(doctorId);
                if (!doctorId || typeof doctorId !== 'string') {
                    throw new Error("userId is required and must be a string.");
                }
                const user = await this.adminService.deleteDoctor(doctorId);
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
        };
        this.getAppointments = async (httpRequest) => {
            try {
                const admin = httpRequest.user?.id;
                if (!admin || typeof admin !== 'string') {
                    throw new Error("userId is required and must be a string.");
                }
                const appointments = await this.adminService.getAppoinments(admin);
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
        };
        this.getReviews = async (httpRequest) => {
            {
                try {
                    const admin = httpRequest.user?.id;
                    if (!admin || typeof admin !== 'string') {
                        throw new Error("userId is required and must be a string.");
                    }
                    const reviews = await this.adminService.getReviews(admin);
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
        };
        this.deleteReview = async (httpRequest) => {
            try {
                const reviewId = httpRequest?.query?.reviewId;
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
                const deleteReview = await this.adminService.deleteReviews(reviewId);
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
        };
        this.adminService = adminService;
    }
}

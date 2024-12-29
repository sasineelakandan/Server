import { error } from "console";
export class BookingController {
    constructor(bookingService) {
        this.getDoctors = async (httpRequest) => {
            try {
                const userId = httpRequest?.user?.id;
                if (!userId) {
                    throw error('userId not found');
                }
                const doctors = await this.bookingService.getDoctors(userId);
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
        };
        this.doctorDetails = async (httpRequest) => {
            try {
                const userId = httpRequest?.user?.id;
                const { doctorId } = httpRequest?.body;
                if (!userId) {
                    throw error('userId not found');
                }
                const doctor = await this.bookingService.doctorDetails(doctorId);
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
        };
        this.getSlots = async (httpRequest) => {
            try {
                const userId = httpRequest?.user?.id;
                const { doctorId } = httpRequest?.body;
                if (!userId) {
                    throw error('userId not found');
                }
                if (!doctorId) {
                    throw error('doctorId not found');
                }
                const slots = await this.bookingService.getSlots(doctorId, userId);
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
        };
        this.bookingSlots = async (httpRequest) => {
            try {
                const userId = httpRequest?.user?.id;
                if (!userId) {
                    throw error('user unauthorized');
                }
                const { doctorId, selectedSlot } = httpRequest?.body;
                console.log(selectedSlot);
                if (!doctorId) {
                    throw error('doctorId not found');
                }
                const slotStatus = await this.bookingService.bookingSlots(userId, doctorId, selectedSlot);
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
        };
        this.patientDetails = async (httpRequest) => {
            try {
                const userId = httpRequest?.user?.id;
                const patientDetails = httpRequest?.body;
                if (!userId) {
                    throw error('user unauthorized');
                }
                const Patient = await this.bookingService.patientDetails(userId, patientDetails);
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
        };
        this.paymentDetails = async (httpRequest) => {
            try {
                const userId = httpRequest?.user?.id;
                const paymentDetails = httpRequest?.body;
                if (!userId) {
                    throw error('user unauthorized');
                }
                const payment = await this.bookingService.paymentDetails(userId, paymentDetails);
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
        };
        this.PaymentSucess = async (httpRequest) => {
            try {
                const { productinfo } = httpRequest?.body;
                const { txnid } = httpRequest?.body;
                const payment = await this.bookingService.paymentSuccess(productinfo, txnid);
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
        };
        this.bookingService = bookingService;
    }
}

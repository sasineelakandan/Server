import { Router } from "express";
import { expressCallback } from "../utils/expresscallback";
import authMiddleware from "../middlewere/jwt/authentiCateToken";
import { BookingController } from "../conrollers/bookingController";
import { BookingService } from "../services/bookingService";
import { BookingRepository } from "../repositories/bookingRepository";
import checkIfBlocked from "../middlewere/isBlocked/isBlockeduser";
const router = Router();

const repository = new BookingRepository();

const service = new BookingService(repository);

const controller = new BookingController(service);


router
.route('/getdoctors')
.get(authMiddleware,checkIfBlocked,expressCallback(controller.getDoctors))
.patch(authMiddleware,checkIfBlocked,expressCallback(controller.doctorDetails))
.put(authMiddleware,checkIfBlocked,expressCallback(controller.getSlots))
.post(authMiddleware,checkIfBlocked,expressCallback(controller.bookingSlots))

router
.route('/bookings')
.post(authMiddleware,checkIfBlocked,expressCallback(controller.patientDetails))
.put(authMiddleware,checkIfBlocked,expressCallback(controller.paymentDetails))
.patch(expressCallback(controller.PaymentSucess))

export default router;
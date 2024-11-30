import { Router } from "express";
import { expressCallback } from "../utils/expressCallback";
import authMiddleware from "../midlewere/jwt/authentiCateToken";
import { BookingController } from "../conrollers/bookingController";
import { BookingService } from "../services/bookingService";
import { BookingRepository } from "../repositories/bookingRepository";
import checkIfBlocked from "../midlewere/isBlocked/isBlockeduser";
const router = Router();

const repository = new BookingRepository();

const service = new BookingService(repository);

const controller = new BookingController(service);


router
.route('/getdoctors')
.get(authMiddleware,checkIfBlocked,expressCallback(controller.getDoctors))
.patch(authMiddleware,checkIfBlocked,expressCallback(controller.doctorDetails))

export default router;
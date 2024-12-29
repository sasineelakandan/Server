import { Router } from "express";
import { expressCallback } from "../utils/expressCallback";
import { DoctorController } from "../conrollers/doctorController";
import { DoctorRepository } from "../repositories/doctorRepository";
import { DoctorService } from "../services/docterService";
import { signupValidator } from "../midlewere/validator/doctorsignupValidator";
import authMiddleware from "../midlewere/jwt/authentiCateToken";
import { loginValidator } from "../midlewere/validator/loginValidators";
import checkIfBlocked from "../midlewere/isBlocked/isblockedDoctor";
const router = Router();
const repository = new DoctorRepository();
const service = new DoctorService(repository);
const controller = new DoctorController(service);
router
    .route("/signup")
    .post(signupValidator, expressCallback(controller.doctorSignup));
router
    .route('/verifyotp')
    .post(expressCallback(controller.verifyOtp));
router
    .route('/resendotp')
    .post(expressCallback(controller.resendOtp));
router
    .route('/login')
    .post(loginValidator, expressCallback(controller.doctorLogin));
router
    .route('/profile')
    .get(authMiddleware, checkIfBlocked, expressCallback(controller.doctorProfile))
    .put(authMiddleware, checkIfBlocked, expressCallback(controller.changeProfile))
    .patch(authMiddleware, checkIfBlocked, expressCallback(controller.changePassword))
    .post(authMiddleware, checkIfBlocked, expressCallback(controller.updateProfilepic));
router
    .route('/verifyprofile')
    .post(authMiddleware, checkIfBlocked, expressCallback(controller.verifyProfile));
router
    .route('/appointments')
    .get(authMiddleware, checkIfBlocked, expressCallback(controller.getAppointments))
    .post(authMiddleware, checkIfBlocked, expressCallback(controller.resheduleAppointment))
    .patch(authMiddleware, checkIfBlocked, expressCallback(controller.completeAppointment))
    .put(authMiddleware, checkIfBlocked, expressCallback(controller.cancelAppointment));
router
    .route('/chat')
    .get(authMiddleware, checkIfBlocked, expressCallback(controller.getMessages))
    .post(authMiddleware, checkIfBlocked, expressCallback(controller.chatwithUser))
    .put(authMiddleware, checkIfBlocked, expressCallback(controller.sendMessage));
router
    .route('/chatroom')
    .get(authMiddleware, checkIfBlocked, expressCallback(controller.getChatMembers));
router
    .route('/forgotpassword')
    .post(expressCallback(controller.forgotPasswordOtp))
    .put(expressCallback(controller.forgotPassword));
export default router;

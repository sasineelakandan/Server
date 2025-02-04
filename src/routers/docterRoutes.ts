import { Router,Request,Response } from "express";
import { expressCallback } from "../utils/expresscallback";
import { DoctorController } from "../conrollers/doctorController";
import { DoctorRepository } from "../repositories/doctorRepository";
import { DoctorService } from "../services/docterService";
import {signupValidator } from "../middlewere/validator/doctorsignupValidator";
import authMiddleware from "../middlewere/jwt/authentiCateToken";
import {loginValidator } from "../middlewere/validator/loginValidators"
import checkIfBlocked from "../middlewere/isBlocked/isblockedDoctor";
import upload from "../utils/multer";
const router = Router();

const repository = new DoctorRepository();

const service = new DoctorService(repository);

const controller = new DoctorController(service);

router
  .route("/signup")
  .post( signupValidator, expressCallback(controller.doctorSignup));
 
router
 .route('/verifyotp')
 .post(expressCallback(controller.verifyOtp))
router
  .route('/resendotp')
  .post(expressCallback(controller.resendOtp))
  router
  .route('/login')
  .post(loginValidator,expressCallback(controller.doctorLogin))
  router
  .route('/profile')
  .get(authMiddleware,checkIfBlocked, expressCallback(controller.doctorProfile))
  .put(authMiddleware,checkIfBlocked,expressCallback(controller.changeProfile))
  .patch(authMiddleware,checkIfBlocked,expressCallback(controller.changePassword))
  .post(authMiddleware,checkIfBlocked,upload.single('file'),expressCallback(controller.updateProfilepic))
  router
  .route('/verifyprofile')
  .post(authMiddleware,checkIfBlocked,expressCallback(controller.verifyProfile))

 
  router
  .route('/appointments')
  .get(authMiddleware,checkIfBlocked,expressCallback(controller.getAppointments))
  .post(authMiddleware,checkIfBlocked,expressCallback(controller.resheduleAppointment))
  .patch(authMiddleware,checkIfBlocked,expressCallback(controller.completeAppointment))
  .put(authMiddleware,checkIfBlocked,expressCallback(controller.cancelAppointment))

  router
  .route('/chat')
  .get(authMiddleware,checkIfBlocked,expressCallback(controller.getMessages))
  .post(authMiddleware,checkIfBlocked,expressCallback(controller.chatwithUser))
  .put(authMiddleware,checkIfBlocked,expressCallback(controller.sendMessage))
 
  router
  .route('/chatroom')
  .get(authMiddleware,checkIfBlocked,expressCallback(controller.getChatMembers))
router
  .route('/createslots')
  .post(authMiddleware,checkIfBlocked,expressCallback(controller.createSlots))
  .put(authMiddleware,checkIfBlocked,expressCallback(controller.updateSlots))
  .patch(authMiddleware,checkIfBlocked,expressCallback(controller.blockSlots))
  


  router
  .route('/forgotpassword')
  .post(expressCallback(controller.forgotPasswordOtp))
  .put(expressCallback(controller.forgotPassword))

  router
  .route('/transactions')
  .get(authMiddleware,checkIfBlocked,expressCallback(controller.getWalletHisotry))

  router
  .route('/Notification')
  .get(authMiddleware,checkIfBlocked,expressCallback(controller.getNotification))
  
  router
  .route('/available-slots')
  .get(authMiddleware,checkIfBlocked,expressCallback(controller.getSlots))
  .put(authMiddleware,checkIfBlocked,expressCallback(controller.asignLeaveDays))

  router
  .route('/dashbord')
  .get(authMiddleware,checkIfBlocked,expressCallback(controller.Appointments))
 
  router.route("/logout").post((req:Request, res:Response) => {
    console.log('hai')
    res.clearCookie("accessToken", {
      domain: ".docreserva.site",
      path: "/",
      sameSite: "strict",
    });
    
    res.clearCookie("refreshToken", {
      domain: ".docreserva.site",
      path: "/",
      sameSite: "strict",
    });
    res.status(200).json({ message: "Logged out successfully" });
  });



export default router;
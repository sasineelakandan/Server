import { Router } from "express";
import { expressCallback } from "../utils/expressCallback";
import { DoctorController } from "../conrollers/doctorController";
import { DoctorRepository } from "../repositories/doctorRepository";
import { DoctorService } from "../services/docterService";
import {signupValidator } from "../midlewere/validator/doctorsignupValidator";
import authMiddleware from "../midlewere/jwt/authentiCateToken";
import {loginValidator } from "../midlewere/validator/loginValidators"
import checkIfBlocked from "../midlewere/isBlocked/isblockedDoctor";
const router = Router();

const repository = new DoctorRepository();

const service = new DoctorService(repository);

const controller = new DoctorController(service);

router
  .route("/api/doctor/signup")
  .post( signupValidator, expressCallback(controller.doctorSignup));
 
router
 .route('/api/doctor/verifyotp')
 .post(expressCallback(controller.verifyOtp))
router
  .route('/api/doctor/resendotp')
  .post(expressCallback(controller.resendOtp))
  router
  .route('/api/doctor/login')
  .post(loginValidator,expressCallback(controller.doctorLogin))
  router
  .route('/api/doctor/profile')
  .post(authMiddleware,checkIfBlocked, expressCallback(controller.doctorProfile))
  router
  .route('/api/doctor/verifyprofile')
  .post(authMiddleware,expressCallback(controller.verifyProfile))



  
export default router;
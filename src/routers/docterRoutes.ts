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
  .post(authMiddleware,checkIfBlocked, expressCallback(controller.doctorProfile))
  router
  .route('/verifyprofile')
  .post(authMiddleware,expressCallback(controller.verifyProfile))



  
export default router;
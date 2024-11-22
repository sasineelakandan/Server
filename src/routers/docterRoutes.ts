import { Router } from "express";
import { expressCallback } from "../utils/expressCallback";
import { DoctorController } from "../conrollers/doctorController";
import { DoctorRepository } from "../repositories/doctorRepository";
import { DoctorService } from "../services/docterService";
import { loginValidator } from "../midlewere/validator/loginValidators";
import authMiddleware from "../midlewere/jwt/authentiCateToken";

const router = Router();

const repository = new DoctorRepository();

const service = new DoctorService(repository);

const controller = new DoctorController(service);

router
  .route("/api/doctor/signup")
  .post( expressCallback(controller.doctorSignup));
 
router
 .route('/api/doctor/verifyotp')
 .post(expressCallback(controller.verifyOtp))
router
  .route('/api/doctor/resendotp')
  .post(expressCallback(controller.resendOtp))
  router
  .route('/api/doctor/login')
  .post(expressCallback(controller.doctorLogin))
  router
  .route('/api/doctor/profile')
  .get(authMiddleware, expressCallback(controller.doctorProfile))
  router
  .route('/api/doctor/verifyprofile')
  .post(authMiddleware,expressCallback(controller.verifyProfile))



  
export default router;
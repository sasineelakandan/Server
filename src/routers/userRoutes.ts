import { Router } from "express";
import { expressCallback } from "../utils/expressCallback";
import { UserController } from "../conrollers/userController";
import { UserRepository } from "../repositories/userRepository";
import { UserService } from "../services/userService";
import { signupValidator } from "../midlewere/validator/signupValidators";
import { loginValidator } from "../midlewere/validator/loginValidators";
import authMiddleware from "../midlewere/jwt/authentiCateToken";
import checkIfBlocked from "../midlewere/isBlocked/isBlockeduser";

const router = Router();

const repository = new UserRepository();

const service = new UserService(repository);

const controller = new UserController(service);

router
  .route("/signup")
  .post(signupValidator, expressCallback(controller.userSignup));
 
router
 .route('/verifyotp')
 .post(expressCallback(controller.verifyOtp))
router
  .route('/resendotp')
  .post(expressCallback(controller.resendOtp))
  router
  .route('/login')
  .post(loginValidator,expressCallback(controller.userLogin))
  router
  .route('/profile')
  .post(authMiddleware,checkIfBlocked,expressCallback(controller.userProfile))
  .patch(authMiddleware,checkIfBlocked,expressCallback(controller.changeProfile))
  .put(authMiddleware,checkIfBlocked,expressCallback(controller.changePassword))
  router
  .route('/appointments')
  .get(authMiddleware,checkIfBlocked,expressCallback(controller.getAppointments))
export default router;
import { Router } from "express";
import { expressCallback } from "../utils/expressCallback";
import { UserController } from "../conrollers/userController";
import { UserRepository } from "../repositories/userRepository";
import { UserService } from "../services/userService";
import { signupValidator } from "../midlewere/validator/signupValidators";
import { loginValidator } from "../midlewere/validator/loginValidators";
import authMiddleware from "../midlewere/jwt/authentiCateToken";

const router = Router();

const repository = new UserRepository();

const service = new UserService(repository);

const controller = new UserController(service);

router
  .route("/api/user/signup")
  .post(signupValidator, expressCallback(controller.userSignup));
 
router
 .route('/api/user/verifyotp')
 .post(expressCallback(controller.verifyOtp))
router
  .route('/api/user/resendotp')
  .post(expressCallback(controller.resendOtp))
  router
  .route('/api/user/login')
  .post(loginValidator,expressCallback(controller.userLogin))
  router
  .route('/api/user/profile')
  .post(authMiddleware,expressCallback(controller.userProfile))

export default router;
import { Router } from "express";
import { expressCallback } from "../utils/expressCallback";
import { UserController } from "../conrollers/userController";
import { UserRepository } from "../repositories/userRepository";
import { UserService } from "../services/userService";
import { signupValidator } from "../midlewere/validator/signupValidators";


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


export default router;
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
  .get(authMiddleware,checkIfBlocked,expressCallback(controller.userProfile))
  .patch(authMiddleware,checkIfBlocked,expressCallback(controller.changeProfile))
  .put(authMiddleware,checkIfBlocked,expressCallback(controller.changePassword))
  .post(authMiddleware,checkIfBlocked,expressCallback(controller.updateProfilepic))

  router
  .route('/appointments')
  .get(authMiddleware,checkIfBlocked,expressCallback(controller.getAppointments))
  .put(authMiddleware,checkIfBlocked,expressCallback(controller.cancelAppointments))


  router
  .route('/createslots')
  .post(authMiddleware,checkIfBlocked,expressCallback(controller.slotAssign))

  router
  .route('/chat')
  .get(authMiddleware,checkIfBlocked,expressCallback(controller.getMessages))
  .post(authMiddleware,checkIfBlocked,expressCallback(controller.chatwithDoctor))
  .put(authMiddleware,checkIfBlocked,expressCallback(controller.sendMessage))
 
  router
  .route('/chatroom')
  .get(authMiddleware,checkIfBlocked,expressCallback(controller.getChatMembers))

  router
  .route('/Notification')
  .get(authMiddleware,checkIfBlocked,expressCallback(controller.getcompleteAppointment))
  .post(authMiddleware,checkIfBlocked,expressCallback(controller.userReview))

  router
  .route('/google-login')
  .post(expressCallback(controller.googleLogin))

  router
  .route('/reviews')
  .get(authMiddleware,checkIfBlocked,expressCallback(controller.getReview))

  


export default router;
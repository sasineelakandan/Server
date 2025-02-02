import { Router } from "express";
import { expressCallback } from "../utils/expresscallback";
import { UserController } from "../conrollers/userController";
import { UserRepository } from "../repositories/userRepository";
import { UserService } from "../services/userService";
import { signupValidator } from "../middlewere/validator/signupValidators";
import { loginValidator } from "../middlewere/validator/loginValidators";
import authMiddleware from "../middlewere/jwt/authentiCateToken";
import checkIfBlocked from "../middlewere/isBlocked/isBlockeduser";
import upload  from "../utils/multer";
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
  .post(authMiddleware,checkIfBlocked,upload.single('file'),expressCallback(controller.updateProfilepic))

  router
  .route('/appointments')
  .get(authMiddleware,checkIfBlocked,expressCallback(controller.getAppointments))
  .put(authMiddleware,checkIfBlocked,expressCallback(controller.cancelAppointments))


  router
  .route('/createslots')
  .get(authMiddleware,checkIfBlocked,expressCallback(controller.getSlots))
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

  router
  .route('/transactions')
  .get(authMiddleware,checkIfBlocked,expressCallback(controller.getWalletHisotry))


export default router;
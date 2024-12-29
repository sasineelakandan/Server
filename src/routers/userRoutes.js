"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var expressCallback_1 = require("../utils/expressCallback");
var userController_1 = require("../conrollers/userController");
var userRepository_1 = require("../repositories/userRepository");
var userService_1 = require("../services/userService");
var signupValidators_1 = require("../midlewere/validator/signupValidators");
var loginValidators_1 = require("../midlewere/validator/loginValidators");
var authentiCateToken_1 = __importDefault(require("../midlewere/jwt/authentiCateToken"));
var isBlockeduser_1 = __importDefault(require("../midlewere/isBlocked/isBlockeduser"));
var router = (0, express_1.Router)();
var repository = new userRepository_1.UserRepository();
var service = new userService_1.UserService(repository);
var controller = new userController_1.UserController(service);
router
    .route("/signup")
    .post(signupValidators_1.signupValidator, (0, expressCallback_1.expressCallback)(controller.userSignup));
router
    .route('/verifyotp')
    .post((0, expressCallback_1.expressCallback)(controller.verifyOtp));
router
    .route('/resendotp')
    .post((0, expressCallback_1.expressCallback)(controller.resendOtp));
router
    .route('/login')
    .post(loginValidators_1.loginValidator, (0, expressCallback_1.expressCallback)(controller.userLogin));
router
    .route('/profile')
    .get(authentiCateToken_1.default, isBlockeduser_1.default, (0, expressCallback_1.expressCallback)(controller.userProfile))
    .patch(authentiCateToken_1.default, isBlockeduser_1.default, (0, expressCallback_1.expressCallback)(controller.changeProfile))
    .put(authentiCateToken_1.default, isBlockeduser_1.default, (0, expressCallback_1.expressCallback)(controller.changePassword))
    .post(authentiCateToken_1.default, isBlockeduser_1.default, (0, expressCallback_1.expressCallback)(controller.updateProfilepic));
router
    .route('/appointments')
    .get(authentiCateToken_1.default, isBlockeduser_1.default, (0, expressCallback_1.expressCallback)(controller.getAppointments))
    .put(authentiCateToken_1.default, isBlockeduser_1.default, (0, expressCallback_1.expressCallback)(controller.cancelAppointments));
router
    .route('/createslots')
    .post(authentiCateToken_1.default, isBlockeduser_1.default, (0, expressCallback_1.expressCallback)(controller.slotAssign));
router
    .route('/chat')
    .get(authentiCateToken_1.default, isBlockeduser_1.default, (0, expressCallback_1.expressCallback)(controller.getMessages))
    .post(authentiCateToken_1.default, isBlockeduser_1.default, (0, expressCallback_1.expressCallback)(controller.chatwithDoctor))
    .put(authentiCateToken_1.default, isBlockeduser_1.default, (0, expressCallback_1.expressCallback)(controller.sendMessage));
router
    .route('/chatroom')
    .get(authentiCateToken_1.default, isBlockeduser_1.default, (0, expressCallback_1.expressCallback)(controller.getChatMembers));
router
    .route('/Notification')
    .get(authentiCateToken_1.default, isBlockeduser_1.default, (0, expressCallback_1.expressCallback)(controller.getcompleteAppointment))
    .post(authentiCateToken_1.default, isBlockeduser_1.default, (0, expressCallback_1.expressCallback)(controller.userReview));
router
    .route('/google-login')
    .post((0, expressCallback_1.expressCallback)(controller.googleLogin));
router
    .route('/reviews')
    .get(authentiCateToken_1.default, isBlockeduser_1.default, (0, expressCallback_1.expressCallback)(controller.getReview));
exports.default = router;

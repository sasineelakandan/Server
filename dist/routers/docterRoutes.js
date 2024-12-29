"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const expressCallback_1 = require("../utils/expressCallback");
const doctorController_1 = require("../conrollers/doctorController");
const doctorRepository_1 = require("../repositories/doctorRepository");
const docterService_1 = require("../services/docterService");
const doctorsignupValidator_1 = require("../midlewere/validator/doctorsignupValidator");
const authentiCateToken_1 = __importDefault(require("../midlewere/jwt/authentiCateToken"));
const loginValidators_1 = require("../midlewere/validator/loginValidators");
const isblockedDoctor_1 = __importDefault(require("../midlewere/isBlocked/isblockedDoctor"));
const router = (0, express_1.Router)();
const repository = new doctorRepository_1.DoctorRepository();
const service = new docterService_1.DoctorService(repository);
const controller = new doctorController_1.DoctorController(service);
router
    .route("/signup")
    .post(doctorsignupValidator_1.signupValidator, (0, expressCallback_1.expressCallback)(controller.doctorSignup));
router
    .route('/verifyotp')
    .post((0, expressCallback_1.expressCallback)(controller.verifyOtp));
router
    .route('/resendotp')
    .post((0, expressCallback_1.expressCallback)(controller.resendOtp));
router
    .route('/login')
    .post(loginValidators_1.loginValidator, (0, expressCallback_1.expressCallback)(controller.doctorLogin));
router
    .route('/profile')
    .get(authentiCateToken_1.default, isblockedDoctor_1.default, (0, expressCallback_1.expressCallback)(controller.doctorProfile))
    .put(authentiCateToken_1.default, isblockedDoctor_1.default, (0, expressCallback_1.expressCallback)(controller.changeProfile))
    .patch(authentiCateToken_1.default, isblockedDoctor_1.default, (0, expressCallback_1.expressCallback)(controller.changePassword))
    .post(authentiCateToken_1.default, isblockedDoctor_1.default, (0, expressCallback_1.expressCallback)(controller.updateProfilepic));
router
    .route('/verifyprofile')
    .post(authentiCateToken_1.default, isblockedDoctor_1.default, (0, expressCallback_1.expressCallback)(controller.verifyProfile));
router
    .route('/appointments')
    .get(authentiCateToken_1.default, isblockedDoctor_1.default, (0, expressCallback_1.expressCallback)(controller.getAppointments))
    .post(authentiCateToken_1.default, isblockedDoctor_1.default, (0, expressCallback_1.expressCallback)(controller.resheduleAppointment))
    .patch(authentiCateToken_1.default, isblockedDoctor_1.default, (0, expressCallback_1.expressCallback)(controller.completeAppointment))
    .put(authentiCateToken_1.default, isblockedDoctor_1.default, (0, expressCallback_1.expressCallback)(controller.cancelAppointment));
router
    .route('/chat')
    .get(authentiCateToken_1.default, isblockedDoctor_1.default, (0, expressCallback_1.expressCallback)(controller.getMessages))
    .post(authentiCateToken_1.default, isblockedDoctor_1.default, (0, expressCallback_1.expressCallback)(controller.chatwithUser))
    .put(authentiCateToken_1.default, isblockedDoctor_1.default, (0, expressCallback_1.expressCallback)(controller.sendMessage));
router
    .route('/chatroom')
    .get(authentiCateToken_1.default, isblockedDoctor_1.default, (0, expressCallback_1.expressCallback)(controller.getChatMembers));
router
    .route('/forgotpassword')
    .post((0, expressCallback_1.expressCallback)(controller.forgotPasswordOtp))
    .put((0, expressCallback_1.expressCallback)(controller.forgotPassword));
exports.default = router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const expressCallback_1 = require("../utils/expressCallback");
const AdminController_1 = require("../conrollers/AdminController");
const adminRepository_1 = require("../repositories/adminRepository");
const adminService_1 = require("../services/adminService");
const loginValidators_1 = require("../midlewere/validator/loginValidators");
const authentiCateToken_1 = __importDefault(require("../midlewere/jwt/authentiCateToken"));
const router = (0, express_1.Router)();
const repository = new adminRepository_1.AdminRepository();
const service = new adminService_1.AdminService(repository);
const controller = new AdminController_1.AdminController(service);
router
    .route('/adminlogin')
    .post(loginValidators_1.loginValidator, (0, expressCallback_1.expressCallback)(controller.adminLogin));
router
    .route('/patients')
    .get(authentiCateToken_1.default, (0, expressCallback_1.expressCallback)(controller.patientDetails))
    .patch(authentiCateToken_1.default, (0, expressCallback_1.expressCallback)(controller.isBlocked))
    .delete(authentiCateToken_1.default, (0, expressCallback_1.expressCallback)(controller.isDelete));
router
    .route('/doctors')
    .get(authentiCateToken_1.default, (0, expressCallback_1.expressCallback)(controller.doctorDetails))
    .patch(authentiCateToken_1.default, (0, expressCallback_1.expressCallback)(controller.isVerify));
router
    .route('/verifieddoctors')
    .get(authentiCateToken_1.default, (0, expressCallback_1.expressCallback)(controller.verifiedDoctors))
    .patch(authentiCateToken_1.default, (0, expressCallback_1.expressCallback)(controller.blockDoctor))
    .delete(authentiCateToken_1.default, (0, expressCallback_1.expressCallback)(controller.deleteDoctor));
router
    .route('/appointments')
    .get(authentiCateToken_1.default, (0, expressCallback_1.expressCallback)(controller.getAppointments));
router
    .route('/reviews')
    .get(authentiCateToken_1.default, (0, expressCallback_1.expressCallback)(controller.getReviews))
    .delete(authentiCateToken_1.default, (0, expressCallback_1.expressCallback)(controller.deleteReview));
exports.default = router;

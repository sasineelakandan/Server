"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const expressCallback_1 = require("../utils/expressCallback");
const authentiCateToken_1 = __importDefault(require("../midlewere/jwt/authentiCateToken"));
const bookingController_1 = require("../conrollers/bookingController");
const bookingService_1 = require("../services/bookingService");
const bookingRepository_1 = require("../repositories/bookingRepository");
const isBlockeduser_1 = __importDefault(require("../midlewere/isBlocked/isBlockeduser"));
const router = (0, express_1.Router)();
const repository = new bookingRepository_1.BookingRepository();
const service = new bookingService_1.BookingService(repository);
const controller = new bookingController_1.BookingController(service);
router
    .route('/getdoctors')
    .get(authentiCateToken_1.default, isBlockeduser_1.default, (0, expressCallback_1.expressCallback)(controller.getDoctors))
    .patch(authentiCateToken_1.default, isBlockeduser_1.default, (0, expressCallback_1.expressCallback)(controller.doctorDetails))
    .put(authentiCateToken_1.default, isBlockeduser_1.default, (0, expressCallback_1.expressCallback)(controller.getSlots))
    .post(authentiCateToken_1.default, isBlockeduser_1.default, (0, expressCallback_1.expressCallback)(controller.bookingSlots));
router
    .route('/bookings')
    .post(authentiCateToken_1.default, isBlockeduser_1.default, (0, expressCallback_1.expressCallback)(controller.patientDetails))
    .put(authentiCateToken_1.default, isBlockeduser_1.default, (0, expressCallback_1.expressCallback)(controller.paymentDetails))
    .patch((0, expressCallback_1.expressCallback)(controller.PaymentSucess));
exports.default = router;

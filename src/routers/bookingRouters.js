"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var expressCallback_1 = require("../utils/expressCallback");
var authentiCateToken_1 = __importDefault(require("../midlewere/jwt/authentiCateToken"));
var bookingController_1 = require("../conrollers/bookingController");
var bookingService_1 = require("../services/bookingService");
var bookingRepository_1 = require("../repositories/bookingRepository");
var isBlockeduser_1 = __importDefault(require("../midlewere/isBlocked/isBlockeduser"));
var router = (0, express_1.Router)();
var repository = new bookingRepository_1.BookingRepository();
var service = new bookingService_1.BookingService(repository);
var controller = new bookingController_1.BookingController(service);
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

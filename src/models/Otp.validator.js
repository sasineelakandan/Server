"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateOtpCode = void 0;
var validateOtpCode = function (otp) {
    return /^\d{6}$/.test(otp);
};
exports.validateOtpCode = validateOtpCode;

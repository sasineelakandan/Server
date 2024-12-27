"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateOtpCode = void 0;
const validateOtpCode = (otp) => {
    return /^\d{6}$/.test(otp);
};
exports.validateOtpCode = validateOtpCode;

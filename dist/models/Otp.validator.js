export const validateOtpCode = (otp) => {
    return /^\d{6}$/.test(otp);
};


export const validateOtpCode = (otp:string) => {
    
    return /^\d{6}$/.test(otp);
  };
import Otp from "../../models/otpModel"; // Import your Mongoose model
import { OtpInput,OtpOutput } from "../../interface/services/userService.types";
class OtpService {
  saveOtp = async (otpData: OtpInput): Promise<OtpOutput> => {
    try{
    const {userId,generatedOtp}=otpData
    const otpExpirationTime = 1 * 60 * 1000;
    const otp = await Otp.create({
        userId,
        otpCode:generatedOtp,
        expiresAt: new Date(Date.now() + otpExpirationTime)
     
    });
    console.log(otp)

    return {
      _id:otp._id.toString(),
     userId:userId.toString(),
     otp:generatedOtp,
     expiryDate:otp.expiresAt
     
    }
   } catch (error: any) {
    console.error("Error adding otp:", error);
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0]; 
      const value = error.keyValue[field]; 
      error.message = `${field} '${value}' already exists.`;
    }
    throw new Error(error.message);
  }
}
}

export default OtpService;

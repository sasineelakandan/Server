import Otp from "../../../models/otpModel";
import Doctor from "../../../models/doctorModel";

import { OtpInput,OtpOutput } from "../../../interface/services/userService.types";
import { sendOtpEmail } from '../otpService'
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
resendOtp = async (doctorId: string): Promise<OtpOutput> => {
  try {
  
    

    const doctor=await Doctor.findOne({_id:doctorId})
    if(!doctor){
      throw new Error("Doctor not found.")
    }
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpirationTime = 1 * 60 * 1000;
    await sendOtpEmail({
      email: doctor.email,
      otp: generatedOtp,
      subject: "Your OTP Code",
      text: `Your OTP code is: ${generatedOtp}`,
      html: `<p>Your OTP code is: <b>${generatedOtp}</b></p>`,
    });
   
    const newOtp = await Otp.create({
      userId:doctorId,
      otpCode: generatedOtp,
      expiresAt: new Date(Date.now() + otpExpirationTime),
    });

    console.log("New OTP generated:", newOtp);

    return {
      _id: newOtp._id.toString(),
      userId: doctorId.toString(),
      otp: generatedOtp,
      expiryDate: newOtp.expiresAt,
    };
  } catch (error: any) {
    console.error("Error resending doctor OTP:", error);
    throw new Error(error.message);
  }
};

 
}

export default OtpService;

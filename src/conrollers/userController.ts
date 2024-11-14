import { Request } from "express";
import { IUserConroller } from '../interface/conrollers/userController.interface';
import { IUserService } from "../interface/services/userService.interface";
import { ControllerResponse } from '../interface/conrollers/userController.types';
import { sendOtpEmail } from '../midlewere/otpservice/otpService';
import OtpService from "../midlewere/otpservice/saveOtp";

export class UserController implements IUserConroller {
  private userService: IUserService;
  private otpService: OtpService;
  constructor(userService: IUserService) {
      this.userService = userService;
      this.otpService = new OtpService();
  }

  userSignup = async (httpRequest: Request): Promise<ControllerResponse> => {
      try {
          const { username, email, phone, password, age, address, gender } = httpRequest.body;
          
        
        
          
        
          const user = await this.userService.userSignup({
              username,
              email,
              phone,
              password,
              age,
              address,
              gender,
          });

          const { accessToken, refreshToken } = user;
          const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
          const userId=user._id.toString()
          await this.otpService.saveOtp({userId,generatedOtp});

       
          await sendOtpEmail({
            email: user.email,
            otp: generatedOtp,
            subject: "Your OTP Code",
            text: `Your OTP code is: ${generatedOtp}`,
            html: `<p>Your OTP code is: <b>${generatedOtp}</b></p>`,
          });
          
          return {
              headers: {
                  "Content-Type": "application/json",
              },
              statusCode: 201,
              body: { ...user, accessToken, refreshToken },
          };
      } catch (e: any) {
          console.error("Error in userSignup:", e);
          
          return {
              headers: {
                  "Content-Type": "application/json",
              },
              statusCode: e.statusCode || 500,
              body: {
                  error: e.message || "An unexpected error occurred",
              },
          };
      }
  };
  verifyOtp=async(httpRequest: Request): Promise<ControllerResponse> =>{
      try{
         const{userId,otp}= httpRequest.body
         const savedOtp = await this.userService.verifyOtp({userId,otp});
         return {
            headers: {
                "Content-Type": "application/json",
            },
            statusCode: 201,
            body: {...savedOtp},
        };
      } catch (e: any) {
          console.error("Error in userSignup:", e);
          
          return {
              headers: {
                  "Content-Type": "application/json",
              },
              statusCode: e.statusCode || 500,
              body: {
                  error: e.message || "An unexpected error occurred",
              },
          };
      }
  }
  resendOtp =async(httpRequest: Request): Promise<ControllerResponse> => {
    try{
        const {userId}=httpRequest.body
      await this.otpService.resendOtp(userId)
      return {
        headers: {
            "Content-Type": "application/json",
        },
        statusCode: 201,
        body: {message:'resendOtp successfull'},
    };
    }catch (error: any) {
     console.log("Error in resend otp", error.message);
     throw new Error(error.message);
   }
  }

  userLogin=async(httpRequest: Request): Promise<ControllerResponse>=> {
      try{
        const {email,password}=httpRequest.body
        const user=await this.userService.userLogin(email,password)
        return {
            headers: {
                "Content-Type": "application/json",
            },
            statusCode: 201,
            body: {...user},
        };
      }
    catch (error: any) {
     console.log("Error in userLogin", error.message);
     throw new Error(error.message);
   }
  }
  
  
}


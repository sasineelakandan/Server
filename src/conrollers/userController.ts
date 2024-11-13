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
  
  }
 


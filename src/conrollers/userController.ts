import { Request } from "express";
import { IUserConroller } from '../interface/conrollers/userController.interface';
import { IUserService } from "../interface/services/userService.interface";
import { ControllerResponse } from '../interface/conrollers/userController.types';
import OtpService from "../midlewere/otpservice/user/saveOtp";
import { CustomRequest } from "../midlewere/jwt/authentiCateToken";


export class UserController implements IUserConroller {
  private userService: IUserService;
  private otpService: OtpService;
  constructor(userService: IUserService) {
      this.userService = userService;
      this.otpService = new OtpService();
  }

  
  userSignup = async (httpRequest: Request): Promise<ControllerResponse> => {
      try {
          const { username, email, phone, password } = httpRequest.body;
          
        
         
          
        
          const user = await this.userService.userSignup({
              username,
              email,
              phone,
              password,
              
          });

          const { accessToken, refreshToken } = user;
          const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
          const userId=user._id.toString()
          const useremail=email
          await this.otpService.saveOtp({userId,generatedOtp},email);

          
         
          
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
         console.log(userId)
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
        console.log(httpRequest)
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
      catch (e: any) {
        console.log(e);
        return {
          headers: {
            "Content-Type": "application/json",
          },
          statusCode: e.statusCode || 500,
          body: {
            error: e.message,
          },
        };
      }
    };
  
  
  userProfile = async (httpRequest: CustomRequest): Promise<ControllerResponse> => {
    try {
      
      const userId = httpRequest?.user?.id;
      const { profilePic } = httpRequest.body;
  
      if (!userId) {
        console.error('User ID not found');
        throw new Error('User ID is required to fetch the profile.');
      }
  
      
      const user = await this.userService.userProfile(profilePic, userId);
      
      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 201, 
        body: { ...user },
      };
    } catch (error: any) {
      console.error('Error in userProfile:', error.message);
  
      
      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 500, 
        body: { error: error.message || 'An unknown error occurred.' },
      };
    }
  };

  changeProfile=async(httpRequest:CustomRequest): Promise<ControllerResponse>=> {
    try {
      
      const userId = httpRequest?.user?.id;
      const { name,phone } = httpRequest.body;
      console.log(name,phone)
      if (!userId) {
        console.error('User ID not found');
        throw new Error('User ID is required to fetch the profile.');
      }
  
      
      const user = await this.userService.changeProfile( userId,name,phone);
  
      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 201, 
        body: { ...user },
      };
    } catch (error: any) {
      console.error('Error in userProfile:', error.message);
  
      
      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 500, 
        body: { error: error.message || 'An unknown error occurred.' },
      };
    }
  }
  changePassword=async(httpRequest:CustomRequest): Promise<ControllerResponse>=> {
    try {
      
      const userId = httpRequest?.user?.id;
      const { oldPassword,newPassword } = httpRequest?.body;
      
      if (!userId) {
        console.error('User ID not found');
        throw new Error('User ID is required to fetch the profile.');
      }
  
      
      const user = await this.userService.changePassword( userId,oldPassword,newPassword);
  
      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 201, 
        body: { ...user },
      };
    } catch (error: any) {
      console.error('Error in userProfile:', error.message);
  
      
      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 500, 
        body: { error: error.message || 'An unknown error occurred.' },
      };
    }
  }
  
  
}


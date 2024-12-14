import { Request } from "express";
import { IUserConroller } from '../interface/conrollers/userController.interface';
import { IUserService } from "../interface/services/userService.interface";
import { ControllerResponse } from '../interface/conrollers/userController.types';
import OtpService from "../midlewere/otpservice/user/saveOtp";
import { CustomRequest } from "../midlewere/jwt/authentiCateToken";
import Appointment from "../models/appointmentModel";
import Review from "../models/reviewModel";


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
      
  
      if (!userId) {
        console.error('User ID not found');
        throw new Error('User ID is required to fetch the profile.');
      }
  
      
      const user = await this.userService.userProfile( userId);
      
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
  getAppointments=async(httpRequest:CustomRequest): Promise<ControllerResponse> =>{
    try {
    
      const userId = httpRequest?.user?.id;
      
      
      if (!userId) {
        console.error('User ID not found');
        throw new Error('User ID is required to fetch the profile.');
      }
  
      
      const appointment = await this.userService.getAppointments( userId);
  
      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 201, 
        body:appointment,
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

  cancelAppointments=async(httpRequest:CustomRequest): Promise<ControllerResponse>=> {
    try {
      
      const userId = httpRequest?.user?.id;
      const {appointmentId}=httpRequest?.body

      
      if (!userId) {
        console.error('User ID not found');
        throw new Error('User ID is required to fetch the profile.');
      }
  
      
      const appointment = await this.userService.cancelAppointments( userId,appointmentId);
  
      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 201, 
        body:appointment,
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
  updateProfilepic=async(httpRequest: CustomRequest): Promise<ControllerResponse>=> {
    try {
      
      const userId = httpRequest?.user?.id;
      const uploadedUrl = httpRequest?.body?.uploadedUrl;
      console.log(uploadedUrl)
      if (!uploadedUrl) {
        throw new Error('Profile picture URL is required.');
      }
    
      if (!userId) {
        console.error('User ID not found in the request.');
        throw new Error('Doctor ID is required to update the profile.');
      }
    
      const updatedProfile = await this.userService.updateProfilePic(userId, uploadedUrl);
    
      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 201, // Created
        body: { message: "Profile picture updated successfully.", data: updatedProfile },
      };
    } catch (error: any) {
      console.error('Error in updateProfilePic:', error.message);
    
      const statusCode = error.message.includes('required') ? 400 : 500; // Client or server error
    
      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode,
        body: { error: error.message || 'An unknown error occurred.' },
      };
    }
  }
  chatwithDoctor=async(httpRequest:CustomRequest): Promise<ControllerResponse>=> {
    try {
      
      const userId = httpRequest?.user?.id;
      const {apptId}= httpRequest?.body;
      
      if (!apptId) {
        throw new Error('Profile picture URL is required.');
      }
    
      if (!userId) {
        console.error('User ID not found in the request.');
        throw new Error('Doctor ID is required to update the profile.');
      }
    
      const updatedProfile = await this.userService.chatwithDoctor(userId, apptId);
    
      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 201, // Created
        body: { message: "Profile picture updated successfully.", data: updatedProfile },
      };
    } catch (error: any) {
      console.error('Error in updateProfilePic:', error.message);
    
      const statusCode = error.message.includes('required') ? 400 : 500; // Client or server error
    
      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode,
        body: { error: error.message || 'An unknown error occurred.' },
      };
    }
  }
  sendMessage=async(httpRequest:CustomRequest): Promise<ControllerResponse> =>{
    try {
      
      const userId = httpRequest?.user?.id;
      const {activeUser,message}= httpRequest?.body;
      
      if (!activeUser) {
        throw new Error('Profile picture URL is required.');
      }
    
      if (!userId) {
        console.error('User ID not found in the request.');
        throw new Error('Doctor ID is required to update the profile.');
      }
    
      const createmessage = await this.userService.sendMessage(activeUser, message);
    
      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 201, 
        body: { message: "Msg send  successfully.", data: createmessage },
      };
    } catch (error: any) {
      console.error('Error in updateProfilePic:', error.message);
    
      const statusCode = error.message.includes('required') ? 400 : 500; 
    
      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode,
        body: { error: error.message || 'An unknown error occurred.' },
      };
    }
  }

  getMessages = async (httpRequest: CustomRequest): Promise<ControllerResponse> => {
    try {
  
      const roomId = httpRequest?.query?.roomId;
  
      
      if (!roomId || typeof roomId !== 'string') {
        console.error('Invalid room ID');
        throw new Error('Room ID is required and must be a string.');
      }
  
      
      const messages = await this.userService.getMessage(roomId);
     console.log(messages)
      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 200, 
        body: messages, 
      };
    } catch (error: any) {
      console.error('Error in getMessages:', error.message);
  
      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 500, // Internal Server Error
        body: { error: error.message || 'An unknown error occurred.' },
      };
    }
  };
  getChatMembers=async(httpRequest: CustomRequest): Promise<ControllerResponse> =>{
    try {
  
      const userId = httpRequest?.user?.id;
  
      
      if (!userId || typeof userId !== 'string') {
        console.error('Invalid room ID');
        throw new Error('Room ID is required and must be a string.');
      }
  
      
      const messages = await this.userService.getChatMembers(userId);
    
      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 200, 
        body: messages, 
      };
    } catch (error: any) {
      console.error('Error in getMessages:', error.message);
  
      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 500, // Internal Server Error
        body: { error: error.message || 'An unknown error occurred.' },
      };
      
    }
  }
  slotAssign=async(httpRequest:CustomRequest): Promise<ControllerResponse> =>{
    try {
    
      const userId = httpRequest?.user?.id;
      const slotData= httpRequest?.body;
      console.log(slotData)
      if (!userId) {
        console.error('User ID not found');
        throw new Error('User ID is required to fetch the profile.');
      }
  
      
      const user = await this.userService.slotAsign( userId,slotData);
  
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
  getcompleteAppointment=async(httpRequest:CustomRequest): Promise<ControllerResponse>=> {
    
    try {
    
      const userId = httpRequest?.user?.id;
      
      if (!userId) {
        console.error('User ID not found');
        throw new Error('User ID is required to fetch the profile.');
      }
  
      
      const appointments = await this.userService.getcompleteAppointment( userId);
  
      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 201, 
        body:appointments
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
  userReview=async(httpRequest:CustomRequest): Promise<ControllerResponse>=> {
    try {
    
      const userId = httpRequest?.user?.id;
      const review=httpRequest?.body
      
      if (!userId) {
        console.error('User ID not found');
        throw new Error('User ID is required to fetch the profile.');
      }
  
      
      const appointments = await this.userService.userReview( userId,review);
  
      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 201, 
        body:appointments
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
  googleLogin=async(httpRequest: Request): Promise<ControllerResponse>=> {

      try {
          const { displayName,email,photoURL} = httpRequest.body;
          
        
          
          
        
          const user = await this.userService.googleLogin({
            displayName,
              email,
              photoURL
              
              
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
  }
  
  



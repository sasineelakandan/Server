import { Request } from "express";
import { IDoctorConroller } from "../interface/conrollers/doctorController.intrface";
import { IDoctorService } from "../interface/services/doctorService.interface";
import{ControllerResponse} from "../interface/conrollers/doctorController.types"
import { sendOtpEmail } from '../midlewere/otpservice/otpService';
import OtpService from "../midlewere/otpservice/doctor/saveOtp";
import { CustomRequest } from "../midlewere/jwt/authentiCateToken";

export class DoctorController implements IDoctorConroller {
    private doctorService: IDoctorService;
    private otpService: OtpService;
    constructor(doctorService: IDoctorService) {
        this.doctorService = doctorService;
        this.otpService = new OtpService();
    }
  
  doctorSignup=async(httpRequest: Request): Promise<ControllerResponse>=> {
      try{
        const { name,email,password,phone, specialization,experience,location} = httpRequest.body;
        console.log(location)
        const doctor = await this.doctorService.doctorSignup({
            name,
            email,
            phone,
            password,
            specialization,
            experience,
            location
            
        });
        const { accessToken, refreshToken } = doctor;
        const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
        const userId=doctor._id.toString()
        await this.otpService.saveOtp({userId,generatedOtp},email);

      
          
          return {
              headers: {
                  "Content-Type": "application/json",
              },
              statusCode: 201,
              body: { ...doctor, accessToken, refreshToken },
          };
      }catch (e: any) {
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
  
    verifyOtp=async(httpRequest: Request): Promise<ControllerResponse> =>{
        try{
           console.log(httpRequest)
           const{userId,otp}= httpRequest.body
           console.log(userId)
           const savedOtp = await this.doctorService.verifyOtp({userId,otp});
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
      doctorLogin=async(httpRequest: Request): Promise<ControllerResponse>=> {
        try{
            const {email,password}=httpRequest.body
            const user=await this.doctorService.doctorLogin(email,password)
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
        }
      
  
  doctorProfile = async (httpRequest: CustomRequest): Promise<ControllerResponse> => {
    try {
      
      const userId = httpRequest?.user?.id;
      
      if (!userId) {
        console.error("User ID not found");
        throw new Error("User ID is required to fetch the doctor profile.");
      }
  
    
      const doctor = await this.doctorService.doctorProfile(userId);
  
      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 200,
        body: { ...doctor },
      };
    } catch (error: any) {
      console.error("Error in doctorProfile:", error.message);
  
  
      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 500, // Internal Server Error
        body: { error: error.message || "An unknown error occurred." },
      };
    }
  };
  
 
    verifyProfile = async (httpRequest: CustomRequest): Promise<ControllerResponse> => {
        try {
          const userId = httpRequest?.user?.id;
          const formData = httpRequest?.body;
      
          if (userId) {
            const doctor = await this.doctorService.updateProfile({ ...formData }, userId);
            return {
              headers: {
                "Content-Type": "application/json",
              },
              statusCode: 201,
              body: { ...doctor },
            };
          } else {
            console.error("User ID not found");
            throw new Error("User ID is required to fetch doctor profile.");
          }
        } catch (error: any) {
          console.log("Error in verify", error.message);
      
          
          return {
            headers: {
              "Content-Type": "application/json",
            },
            statusCode: 500, 
            body: { message: "Internal server error", error: error.message },
          };
        }
      }

    changeProfile=async(httpRequest:CustomRequest): Promise<ControllerResponse>=> {
      try {
        const userId = httpRequest?.user?.id;
        const formData = httpRequest?.body;
    
        if (userId) {
          const doctor = await this.doctorService.changeProfile( userId,{ ...formData });
          return {
            headers: {
              "Content-Type": "application/json",
            },
            statusCode: 201,
            body: { ...doctor },
          };
        } else {
          console.error("User ID not found");
          throw new Error("User ID is required to fetch doctor profile.");
        }
      } catch (error: any) {
        console.log("Error in verify", error.message);
    
        
        return {
          headers: {
            "Content-Type": "application/json",
          },
          statusCode: 500, 
          body: { message: "Internal server error", error: error.message },
        };
      }
    }
    changePassword=async(httpRequest: CustomRequest): Promise<ControllerResponse> =>{
      try {
      
        const userId = httpRequest?.user?.id;
        const { oldPassword,newPassword } = httpRequest?.body;
        
        if (!userId) {
          console.error('User ID not found');
          throw new Error('User ID is required to fetch the profile.');
        }
    
        
        const user = await this.doctorService.changePassword( userId,oldPassword,newPassword);
    
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
      
        const doctorId = httpRequest?.user?.id;
        
        
        if (!doctorId) {
          console.error('User ID not found');
          throw new Error('User ID is required to fetch the profile.');
        }
    
        
        const appointment = await this.doctorService.getAppointments( doctorId);
    
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
    resheduleAppointment=async(httpRequest: CustomRequest): Promise<ControllerResponse>=> {
      try {
      
        const doctorId = httpRequest?.user?.id;
        const payloadData=httpRequest?.body

        
        if (!doctorId) {
          console.error('User ID not found');
          throw new Error('User ID is required to fetch the profile.');
        }
    
        
        const appointment = await this.doctorService.resheduleAppointment( doctorId,payloadData);
    
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
    completeAppointment=async(httpRequest:CustomRequest): Promise<ControllerResponse> =>{
      try {
      
        const doctorId = httpRequest?.user?.id;
        const {appointmentId}=httpRequest?.body

        
        if (!doctorId) {
          console.error('User ID not found');
          throw new Error('User ID is required to fetch the profile.');
        }
    
        
        const appointment = await this.doctorService.completeAppointment( doctorId,appointmentId);
    
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
    cancelAppointment=async(httpRequest:CustomRequest): Promise<ControllerResponse> =>{
      try {
      
        const doctorId = httpRequest?.user?.id;
        const {appointmentId}=httpRequest?.body
        console.log(appointmentId)
        
        if (!doctorId) {
          console.error('User ID not found');
          throw new Error('User ID is required to fetch the profile.');
        }
    
        
        const appointment = await this.doctorService.cancelAppointment( doctorId,appointmentId);
    
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
        console.log(httpRequest)
        const doctorId = httpRequest?.user?.id;
        const uploadedUrl = httpRequest?.body?.uploadedUrl;
        console.log(uploadedUrl)
        if (!uploadedUrl) {
          throw new Error('Profile picture URL is required.');
        }
      
        if (!doctorId) {
          console.error('User ID not found in the request.');
          throw new Error('Doctor ID is required to update the profile.');
        }
      
        const updatedProfile = await this.doctorService.updateProfilepic(doctorId, uploadedUrl);
      
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
    chatwithUser=async(httpRequest:CustomRequest): Promise<ControllerResponse>=> {
      try {
        
        const doctorId = httpRequest?.user?.id;
        const {apptId}= httpRequest?.body;
        
        if (!apptId) {
          throw new Error('Profile picture URL is required.');
        }
      
        if (!doctorId) {
          console.error('User ID not found in the request.');
          throw new Error('Doctor ID is required to update the profile.');
        }
      
        const updatedProfile = await this.doctorService.chatwithUser(doctorId, apptId);
      
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
        
        const doctorId = httpRequest?.user?.id;
        const {activeUser,message}= httpRequest?.body;
        
        if (!activeUser) {
          throw new Error('Profile picture URL is required.');
        }
      
        if (!doctorId) {
          console.error('User ID not found in the request.');
          throw new Error('Doctor ID is required to update the profile.');
        }
      
        const createmessage = await this.doctorService.sendMessage(activeUser, message);
      
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
    
        
        const messages = await this.doctorService.getMessage(roomId);
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
    
        const doctorId = httpRequest?.user?.id;
    
        
        if (!doctorId || typeof doctorId !== 'string') {
          console.error('Invalid room ID');
          throw new Error('Room ID is required and must be a string.');
        }
    
        
        const messages = await this.doctorService.getChatMembers(doctorId);
      
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
    forgotPasswordOtp=async(httpRequest: CustomRequest): Promise<ControllerResponse>=> {
      try {
    
        const email = httpRequest?.body?.email;
    
        
        if (!email || typeof email !== 'string') {
          console.error('Invalid room ID');
          throw new Error('email is required and must be a string.');
        }

        const otp = await this.doctorService.forgotPasswordOtp(email);
        const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
        const userId=otp.status
        await this.otpService.saveOtp({userId,generatedOtp},email);
        return {
          headers: {
            "Content-Type": "application/json",
          },
          statusCode: 200, 
          body: otp, 
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
    forgotPassword=async(httpRequest: Request): Promise<ControllerResponse>=> {
      try{
      console.log(httpRequest)
           const{userId,otp,password}= httpRequest.body
           
           const savedOtp = await this.doctorService.forgotPassword({userId,otp,password});
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
    
  } 
 
  
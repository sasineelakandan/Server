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
        const { name,email,password,phone, specialization,experience} = httpRequest.body;
        const doctor = await this.doctorService.doctorSignup({
            name,
            email,
            phone,
            password,
            specialization,
            experience
            
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
        catch (error: any) {
         console.log("Error in userLogin", error.message);
         throw new Error(error.message);
      }
      
  }
  doctorProfile = async (httpRequest: CustomRequest): Promise<ControllerResponse> => {
    try {
      
      const userId = httpRequest?.user?.id;
      const {profilePic}=httpRequest?.body
      if (!userId) {
        console.error("User ID not found");
        throw new Error("User ID is required to fetch the doctor profile.");
      }
  
    
      const doctor = await this.doctorService.doctorProfile(userId,profilePic);
  
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

    
} 
  
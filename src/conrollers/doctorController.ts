import { Request } from "express";
import { IDoctorConroller } from "../interface/conrollers/doctorController.intrface";
import { IDoctorService } from "../interface/services/doctorService.interface";
import{ControllerResponse} from "../interface/conrollers/doctorController.types"
import { sendOtpEmail } from '../midlewere/otpservice/otpService';
import OtpService from "../midlewere/otpservice/doctor/saveOtp";

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
        await this.otpService.saveOtp({userId,generatedOtp});

        await sendOtpEmail({
            email: doctor.email,
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
           const{doctorId,otp}= httpRequest.body
           console.log(doctorId)
           const savedOtp = await this.doctorService.verifyOtp({doctorId,otp});
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
            const {doctorId}=httpRequest.body
          await this.otpService.resendOtp(doctorId)
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
    
} 
  
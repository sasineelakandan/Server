import { IDoctorService } from "../interface/services/doctorService.interface";
import { IDoctorRepository } from "../interface/repositories/doctorRepository.interface";
import {FindDoctorOtp,DoctorOtpInput,DoctorSignupInput,DoctorSignupOutput,DoctorOtpOutput, DoctorFormData, DoctorProfileOutput, FormData, ProfileFormData, DoctorSlotRequest, SuccessResponse} from "../interface/services/doctorService.type";
import { encryptPassword,comparePassword } from "../utils/encription";
import { AppError } from "../utils/errors";

import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateJWT";


export class DoctorService implements IDoctorService{
    private doctorRepository:IDoctorRepository

    constructor(doctorRepository:IDoctorRepository){
        this.doctorRepository=doctorRepository
       
    }

   
    
      doctorSignup=async(doctorData: DoctorSignupInput): Promise<DoctorSignupOutput>=> {
          
      
        try {
          const encryptedPassword = encryptPassword(doctorData.password);
    
          const doctor = await this.doctorRepository.addDoctor({
            ...doctorData,
            password: encryptedPassword,
          });
    
          const accessToken = generateAccessToken(doctor._id, "doctor");
          const refreshToken = generateRefreshToken(doctor._id, "doctor");
    
          return { ...doctor, accessToken, refreshToken };
        } catch (error: any) {
          console.log("Error in user service", error.message);
          throw new Error(error.message);
        }
      }
      verifyOtp=async(otpData: FindDoctorOtp): Promise<DoctorOtpOutput>=> {
        
          try{
            const {userId,otp}=otpData
            const userotp=await this.doctorRepository.verifyOtp({userId})
           if(userotp.otp!==otp){
            throw new Error("Invalid OTP.");
           }
           if(userotp.otp==otp){
            
            await this.doctorRepository.updateDoctorOtp(userId)
           }
          
          return {...userotp };
          } catch (error: any) {
            console.log("Error in verifyOtp", error.message);
            throw new Error(error.message);
          }
        }
      doctorLogin=async(email: string, password: string): Promise<DoctorSignupOutput> =>{
        try{
          
          const user = await this.doctorRepository.getDoctorByEmail(email);
        
          const isValidPassword = comparePassword(password, user.password);
          
          if (!isValidPassword) throw new AppError("Invalid Credentials", 401);
    
          const accessToken = generateAccessToken(user._id, "doctor");
          const refreshToken = generateRefreshToken(user._id, "doctor");
    
          return {
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            specialization:user.specialization,
            experience:user.experience,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            accessToken,
            refreshToken,
          };
  
         }catch (error: any) {
            console.log("Error in userLogin", error.message);
            throw new Error(error.message);
          }
       }
       doctorProfile=async(userId: string,profilePic:string): Promise<DoctorProfileOutput> =>{
         try{
               const user=await this.doctorRepository.getDoctorProfile(userId,profilePic)
               return{
                ...user
               }
         }catch(error:any){
          console.log("Error in doctorProfile", error.message);
          throw new Error(error.message);
         }
       }

       updateProfile=async(formData: FormData, userId: string): Promise<DoctorProfileOutput>=> {
         
       
        try{
           
          const doctor=await this.doctorRepository.updateDoctorProfile(formData,userId)
          return{
           ...doctor
          }
    }catch(error:any){
     console.log("Error in doctorProfile", error.message);
     throw new Error(error.message);
    }
       }
       changeProfile=async(userId: string, formData: ProfileFormData): Promise<DoctorProfileOutput>=> {
          
        try{
           
          const doctor=await this.doctorRepository.changeProfile(userId,formData)
          return{
           ...doctor
          }
    }catch(error:any){
     console.log("Error in doctorProfile", error.message);
     throw new Error(error.message);
    }
       }
       changePassword=async(userId: string, oldPassword: string, newPassword: string): Promise<DoctorProfileOutput>=> {
        try{

        
          let doctor=await this.doctorRepository.changePassword(userId,oldPassword,newPassword)
          const hashedPassword = await encryptPassword(newPassword);
          const isValidPassword = comparePassword(oldPassword, doctor?.password);
          if(isValidPassword){
            
            doctor=await this.doctorRepository.changePassword(userId,hashedPassword,oldPassword)
          }
          if (!isValidPassword) throw new AppError("Invalid Credentials", 401);
          
          return {
            ...doctor
            
          };
  }catch(error:any){
  console.log("Error in changepassword", error.message);
    throw new Error(error.message);
  }
       }
       slotAsign=async(userId: string, slotData: DoctorSlotRequest): Promise<SuccessResponse> =>{
        try{
          const user=await this.doctorRepository.slotAsign(userId,slotData)
          return{
           status:'success',
           message:'slot asign successfully'
          }
    }catch(error:any){
     console.log("Error in doctorProfile", error.message);
     throw new Error(error.message);
    }
       }
      
      }


     

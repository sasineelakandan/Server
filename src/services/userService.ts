import { IUserService } from "../interface/services/userService.interface";
import { IuserRepository } from "../interface/repositories/userRepository.interface";
import { Appointments, findOtp, OtpOutput, SuccessResponse, UserProfileOutput, UserSignupInput,UserSignupOutput} from "../interface/services/userService.types";
import { encryptPassword,comparePassword } from "../utils/encription";
import { AppError } from "../utils/errors";

import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateJWT";


export class UserService implements IUserService{
    private userRepository:IuserRepository

    constructor(userRepository:IuserRepository){
        this.userRepository=userRepository
       
    }

   
    
      userSignup = async (userData: UserSignupInput): Promise<UserSignupOutput> => {
        try {
          const encryptedPassword = encryptPassword(userData.password);
    
          const user = await this.userRepository.addUser({
            ...userData,
            password: encryptedPassword,
          });
    
          const accessToken = generateAccessToken(user._id, "user");
          const refreshToken = generateRefreshToken(user._id, "user");
    
          return { ...user, accessToken, refreshToken };
        } catch (error: any) {
          console.log("Error in user service", error.message);
          throw new Error(error.message);
        }
      }
      verifyOtp=async(otpData:findOtp): Promise<OtpOutput> => {
        try{
          const {userId,otp}=otpData
          const userotp=await this.userRepository.verifyOtp({userId})
         if(userotp.otp!==otp){
          throw new Error("Invalid OTP.");
         }
         if(userotp.otp==otp){
          
          await this.userRepository.updateUserOtp(userId)
         }
        
        return {...userotp };
        } catch (error: any) {
          console.log("Error in verifyOtp", error.message);
          throw new Error(error.message);
        }
      }
     userLogin=async(email: string, password: string): Promise<UserSignupOutput>=>{
       try{
        const user = await this.userRepository.getUserByEmail(email);

        const isValidPassword = comparePassword(password, user.password);
        if (!isValidPassword) throw new AppError("Invalid Credentials", 401);
  
        const accessToken = generateAccessToken(user._id, "user");
        const refreshToken = generateRefreshToken(user._id, "user");
  
        return {
          _id: user._id,
          username: user.username,
          email: user.email,
          phone: user.phone,
         
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
     
     userProfile=async( userId: string): Promise<UserProfileOutput> =>{
       
     
       try{
                const user=await this.userRepository.userProfile(userId)
                console.log(user)
                return {
                  _id: user._id,
                  username: user.username,
                  email: user.email,
                  phone: user.phone,
                  profilePic:user?.profilePic,
                  createdAt: user.createdAt,
                  updatedAt: user.updatedAt,
                  
                };
       }catch(error:any){
        console.log("Error in userLogin", error.message);
          throw new Error(error.message);
       }
     }
     changeProfile=async(userId: string,name:string,phone:number): Promise<UserProfileOutput>=> {
      try{
        const user=await this.userRepository.changeProfile(userId,name,phone)
        
        return {
          _id: user._id,
          username: user.username,
          email: user.email,
          phone: user.phone,
          profilePic:user.profilePic||'',
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          
        };
}catch(error:any){
console.log("Error in userLogin", error.message);
  throw new Error(error.message);
}
     }
     changePassword=async(userId: string, oldPassword: string, newPassword: string): Promise<UserProfileOutput>=> {
      try{

        
        let user=await this.userRepository.changePassword(userId,oldPassword,newPassword)
        const hashedPassword = await encryptPassword(newPassword);
        const isValidPassword = comparePassword(oldPassword, user?.password);
        if(isValidPassword){
          
           user=await this.userRepository.changePassword(userId,hashedPassword,oldPassword)
        }
        if (!isValidPassword) throw new AppError("Invalid Credentials", 401);
        
        return {
          _id: user._id,
          username: user.username,
          email: user.email,
          phone: user.phone,
          profilePic:user?.profilePic,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          
        };
}catch(error:any){
console.log("Error in changepassword", error.message);
  throw new Error(error.message);
}
     }
     getAppointments=async(userId: string): Promise<Appointments> =>{
      try{
        const appointments=await this.userRepository.getAppointments(userId)
        return appointments
  }catch(error:any){
   console.log("Error in doctorProfile", error.message);
   throw new Error(error.message);
  }
     }
     cancelAppointments=async(userId: string, appointmentId: string): Promise<SuccessResponse>=> {
      try {
        const appointments = await this.userRepository.cancelAppointments(
          userId,
          appointmentId
        );
        return appointments;
      } catch (error: any) {
        console.log("Error in doctorProfile", error.message);
        throw new Error(error.message);
      }
     }
     updateProfilePic=async(userId: string, profilePic: string): Promise<SuccessResponse> =>{
      try {
        const appointments = await this.userRepository.updateProfilePic(
          userId,
          profilePic
        );
        return appointments;
      } catch (error: any) {
        console.log("Error in doctorProfile", error.message);
        throw new Error(error.message);
      }
     }
    }
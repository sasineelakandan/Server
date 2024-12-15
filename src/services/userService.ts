import { IUserService } from "../interface/services/userService.interface";
import { IuserRepository } from "../interface/repositories/userRepository.interface";
import { Appointments, findOtp, Messages, OtpOutput, SuccessResponse, UserProfileOutput, UserSignupInput,UserSignupOutput,ChatMembers, AppointmentSlot, AppointmentSlotOutput, ReviewData, ReviewOutput, GoogleUser, GoogleUserOutput, ReviewDatas} from "../interface/services/userService.types";
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
     chatwithDoctor=async(userId: string, appointmentId: string): Promise<SuccessResponse> =>{
      try {
        const appointments = await this.userRepository.chatwithDoctor(
          userId,
          appointmentId
        );
        return appointments;
      } catch (error: any) {
        console.log("Error in chat", error.message);
        throw new Error(error.message);
      }
     }
     sendMessage=async(roomId: string, message: any): Promise<SuccessResponse> =>{
      try {
        const chatmessage = await this.userRepository.sendMessage(
          roomId,
          message
        );
        return chatmessage;
      } catch (error: any) {
        console.log("Error in chat", error.message);
        throw new Error(error.message);
      }
     }
     getMessage=async(roomId: string): Promise<Messages> =>{
      try {
        const chatmessage = await this.userRepository.getMessage(
          roomId
          
        );
        return chatmessage;
      } catch (error: any) {
        console.log("Error in chat", error.message);
        throw new Error(error.message);
      }
     }
     getChatMembers=async(userId: string): Promise<ChatMembers>=> {
      try {
        const chatmessage = await this.userRepository.getChatMembers(
          userId
          
        );
        return chatmessage;
      } catch (error: any) {
        console.log("Error in chat", error.message);
        throw new Error(error.message);
      }
     }
     slotAsign = async (
      userId: string,
      slotData: AppointmentSlot
    ): Promise<AppointmentSlotOutput> => {
      try {
        const data = await this.userRepository.slotAsign(userId, slotData);
        return {
          _id:data._id.toString(),
          date:data.date,
          startTime:data.startTime,
          doctorId:data.doctorId,
          isBooked:data.isBooked,
          endTime:data.endTime
        };
      } catch (error: any) {
        console.log("Error in doctorProfile", error.message);
        throw new Error(error.message);
      }
    };
    getcompleteAppointment=async(userId: string): Promise<Appointments>=> {
      try {
        const data = await this.userRepository.getcompleteAppointment(userId);
        console.log(data)
        return data
      } catch (error: any) {
        console.log("Error in doctorProfile", error.message);
        throw new Error(error.message);
      }
    }
    userReview=async(userId: string, Review: ReviewData): Promise<ReviewOutput>=> {
      try {
        const data = await this.userRepository.userReview(userId,Review);
        
        return {
          reviewText:data?.reviewText,
          rating:data?.rating,
          createdAt:data?.createdAt.toString()
        };
      } catch (error: any) {
        console.log("Error in doctorProfile", error.message);
        throw new Error(error.message);
      }
    }
    googleLogin=async(GoogleUser: GoogleUser): Promise<GoogleUserOutput> =>{
      try {
        function generateUniquePhoneNumber() {
          
          const firstDigit = Math.floor(Math.random() * 4) + 6;
          const restOfTheNumber = Math.floor(Math.random() * 900000000) + 100000000; 
          const phoneNumber = `${firstDigit}${restOfTheNumber}`; 
        
          return phoneNumber;
        }
        
        
        const uniquePhoneNumber = generateUniquePhoneNumber();
        const phone=uniquePhoneNumber.toString()
  
        const user = await this.userRepository.googleLogin({
          ...GoogleUser,
  phone: phone
          
      });
  
        const accessToken = generateAccessToken(user._id, "user");
        const refreshToken = generateRefreshToken(user._id, "user");
  
        return { ...user, accessToken, refreshToken };
      } catch (error: any) {
        console.log("Error in user service", error.message);
        throw new Error(error.message);
      }
    }
    getReview=async(userId: string): Promise<ReviewDatas> =>{
      try {
        const data = await this.userRepository.getReview(userId);
        
        return data
      } catch (error: any) {
        console.log("Error in doctorProfile", error.message);
        throw new Error(error.message);
      }
    }
     
    }
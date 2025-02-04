import { IUserService } from "../Interface/Service/userServiceinterface";
import { IuserRepository } from "../Interface/Repostry/userrepoInterface";
import { Appointments, findOtp, Messages, OtpOutput, SuccessResponse, UserProfileOutput, UserSignupInput,UserSignupOutput,ChatMembers, AppointmentSlot, AppointmentSlotOutput, ReviewData, ReviewOutput, GoogleUser, GoogleUserOutput, ReviewDatas, SlotDatas, Notification} from "../Interface/Service/userService.type";
import { encryptPassword,comparePassword } from "../utils/encryption";
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
                
                return {
                  _id: user._id,
                  username: user.username,
                  email: user.email,
                  phone: user.phone,
                  profilePic:user?.profilePic,
                  eWallet:user?.eWallet,
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
          eWallet:user?.eWallet,
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
          eWallet:user?.eWallet,
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
      slotData:any
    ): Promise<SuccessResponse> => {
      try {
        const data = await this.userRepository.slotAsign(userId, slotData);
        return {
          status: 'sucess',
          message: "Chat room created successfully",
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
    userReview=async(userId: string, Review: ReviewData,doctorId:string): Promise<ReviewOutput>=> {
      try {
        const data = await this.userRepository.userReview(userId,Review,doctorId);
        
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
        
        
        
       
        const phone='Not provider'
  
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
    getReview=async(doctorId: string): Promise<ReviewDatas> =>{
      try {
        const data = await this.userRepository.getReview(doctorId);
        
        return data
      } catch (error: any) {
        console.log("Error in doctorProfile", error.message);
        throw new Error(error.message);
      }
    }
    getSlots=async(doctorId: string): Promise<SlotDatas>=> {
      try {
        const data = await this.userRepository.getSlots(doctorId);
        
        return data
      } catch (error: any) {
        console.log("Error in doctorProfile", error.message);
        throw new Error(error.message);
      }
    }
    getWalletHisotry=async(doctorId: string): Promise<any>=> {
      try {
        const historys = await this.userRepository.getWalletHisotry(
          doctorId
          
        );
        return historys;
      } catch (error: any) {
        console.log("Error in chat", error.message);
        throw new Error(error.message);
      }
     }

     getNotification=async(userId: string): Promise<any>=> {
      try {
        const historys = await this.userRepository.getNotification(
          userId
          
        );
        return historys;
      } catch (error: any) {
        console.log("Error in chat", error.message);
        throw new Error(error.message);
      }
     }
     
    }
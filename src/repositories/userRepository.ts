import {IuserRepository } from "../interface/repositories/userRepository.interface"
import { findOtp, AddOtpOutput, AddUserInput,AddUserOuput, GetUserOutput,updateUser } from "../interface/repositories/userRepository.types"
import User from "../models/userModel";
import Otp from "../models/otpModel";

export class UserRepository implements IuserRepository {
    addUser = async (userData: AddUserInput): Promise<AddUserOuput> => {
      try {
        const user = await User.create({
          ...userData,
         
        });
  
        return {
          _id: user._id.toString(),
          username: user.username,
          email: user.email,
          phone: user.phone,
         
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        };
      } catch (error: any) {
        console.error("Error adding user:", error);
        if (error.code === 11000) {
          const field = Object.keys(error.keyValue)[0]; 
          const value = error.keyValue[field]; 
          error.message = `${field} '${value}' already exists.`;
        }
        throw new Error(error.message);
      }
   }
   verifyOtp=async(otpData:findOtp ): Promise<AddOtpOutput>=> {
     try{
        const{userId}=otpData
      
        const otp=await Otp.findOne({userId:userId})
         
        if (!otp) {
          throw new Error("OTP not found or expired.");
      }
      if (otp.expiresAt < new Date()) {
        throw new Error("OTP has expired.");
      }
      
        return {
          _id:otp._id.toString(),
          userId:otp.userId.toString(),
          otp:otp.otpCode.toString(),
          expiryDate:otp.expiresAt
        }
     } catch (error: any) {
      console.error("Error find Otp:", error);
      if (error.code === 11000) {
        const field = Object.keys(error.keyValue)[0]; 
        const value = error.keyValue[field]; 
        error.message = `${field} '${value}' already exists.`;
      }
      throw new Error(error.message);
    }
   }
   
    getUserByEmail=async(email: string): Promise<GetUserOutput> => {
      try{
            const user=await User.findOne({email})
            if (!user) {
              throw new Error("User not found or expired.");
          }
          return {
            _id: user._id.toString(),
            username: user.username,
            email: user.email,
            phone: user.phone,
           
            password:user.password,
         
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
          };
      } catch (error: any) {
        console.error("Error find loginUser:", error);
        if (error.code === 11000) {
          const field = Object.keys(error.keyValue)[0]; 
          const value = error.keyValue[field]; 
          error.message = `${field} '${value}' already exists.`;
        }
        throw new Error(error.message);
      }
    }
    updateUserOtp=async(userId: string): Promise<updateUser>=> {
      try{
        const user=await User.updateOne({_id:userId},{$set:{otpVerified:true}})
        return{message:'userOtp updated'}
      } catch (error: any) {
        console.error("Error find loginUser:", error);
        if (error.code === 11000) {
          const field = Object.keys(error.keyValue)[0]; 
          const value = error.keyValue[field]; 
          error.message = `${field} '${value}' already exists.`;
        }
        throw new Error(error.message);
      }
    } 
     
   } 
    
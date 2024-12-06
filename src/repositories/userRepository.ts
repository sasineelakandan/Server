import {IuserRepository } from "../interface/repositories/userRepository.interface"
import { findOtp, AddOtpOutput, AddUserInput,AddUserOuput, GetUserOutput,updateUser, GetuserProfileOutput, Appointments, SuccessResponse } from "../interface/repositories/userRepository.types"
import User from "../models/userModel";
import Otp from "../models/otpModel";
import Appointment from "../models/appointmentModel";

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
      
      throw new Error(error.message);
    }
   }
   
    getUserByEmail=async(email: string): Promise<GetUserOutput> => {
      try{
            const user=await User.findOne({email,otpVerified:true})
            if (!user) {
              throw new Error("User not found or expired.");

          }
          if(user.isBlock){
            console.log('hai')
            throw new Error("You are Blocked!.");
            
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
    userProfile=async(profilePic: string, userId: string): Promise<GetuserProfileOutput>=> {
      
    
      try{
        const userUpdate=await User.updateOne({_id:userId},{$set:{profilePic}})
        const user=await User.findOne({_id:userId})
        if (!user) {
          throw new Error(`Doctor with ID ${userId} not found.`);
        }
        return {
          _id: user._id.toString(),
          username: user.username,
          email: user.email,
          phone: user.phone,
          profilePic:user.profilePic,
          password:user.password,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        };

      }catch(error:any){
        console.error("Error find loginUser:", error);
        
        throw new Error(error.message);
      }
    }
    changeProfile=async(userId: string,name:string,phone:number): Promise<GetuserProfileOutput> =>{
      try{
        const userUpdate=await User.updateOne({_id:userId},{$set:{username:name,phone:phone}})
        const user=await User.findOne({_id:userId})
        if (!user) {
          throw new Error(`Doctor with ID ${userId} not found.`);
        }
        return {
          _id: user._id.toString(),
          username: user.username,
          email: user.email,
          phone: user.phone,
          profilePic:user.profilePic,
          password:user.password,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        };

      }catch(error:any){
        console.error("Error find loginUser:", error);
        
        throw new Error(error.message);
      }
    }
    changePassword=async(userId: string, hashedPassword?: string, oldPassword?: string): Promise<GetuserProfileOutput>=> {
      try{

        const user=await User.findOne({_id:userId})
        if (!user) {
          throw new Error(`Doctor with ID ${userId} not found.`);
        }
        const userUpdate=await User.updateOne({_id:userId},{$set:{password:hashedPassword}})
        return {
          _id: user._id.toString(),
          username: user.username,
          email: user.email,
          phone: user.phone,
          profilePic:user.profilePic,
          password:user.password,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        };

      }catch(error:any){
        console.error("Error find loginUser:", error);
        
        throw new Error(error.message);
      }
    }
    getAppointments=async(userId: string): Promise<Appointments>=> {
      try {
          
       
        const appointments = await Appointment.find({ userId: userId })
        .populate('slotId')       
        .populate('doctorId')     
        .populate('patientId')    
        .populate('userId');
        
        console.log(appointments)
        if (!appointments) {
          throw new Error(`Doctor with ID ${userId} not found.`);
        }
      
        return appointments
      } catch (error: any) {
        console.error("Error in slot creation:", error);
        throw new Error(error.message);
      }
    }
    cancelAppointments=async(userId: string, appointmentId: string): Promise<SuccessResponse> =>{
      try {
      
    
        const updateAppointment=await Appointment.updateOne({_id:appointmentId},{$set:{status:'canceled'}})
        if (!userId) {
          throw new Error(`Doctor with ID ${userId} not found.`);
        }
      
        return {
          status: 'success',
          message: 'Slot assigned successfully',
        };
      } catch (error: any) {
        console.error("Error in slot creation:", error);
        throw new Error(error.message);
      }
    }
    
     
   } 
    
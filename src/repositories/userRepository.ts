import {IuserRepository } from "../Interface/Repostry/userrepoInterface"
import { findOtp, AddOtpOutput, AddUserInput,AddUserOuput, GetUserOutput,updateUser, GetuserProfileOutput, Appointments, SuccessResponse, Messages, ChatMembers, AppointmentSlot, AppointmentSlotOutput, ReviewData, ReviewOutput, GoogleUser, GoogleUserOutput, ReviewDatas, SlotDatas } from "../Interface/Repostry/userRepostry.type"
import User from "../models/userModel";
import Otp from "../models/otpModel";
import Appointment from "../models/appointmentModel";
import ChatRoom from "../models/chatRoomModel";
import Message from "../models/messageModel";

import Slots from "../models/Slots";
import Reviews from "../models/reviewModel";
import {io} from "../../src/index";
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
          phone: user.phone||'',
         
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
            phone: user.phone||'',
           
            password:user.password||'',
         
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
    userProfile=async(userId: string): Promise<GetuserProfileOutput>=> {
      
    
      try{
        
        const user=await User.findOne({_id:userId})
        if (!user) {
          throw new Error(`Doctor with ID ${userId} not found.`);
        }
        return {
          _id: user._id.toString(),
          username: user.username,
          email: user.email,
          phone: user.phone||'',
          profilePic:user.profilePic||'',
          password:user.password||'',
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
          phone: user.phone||'',
          profilePic:user.profilePic||'',
          password:user.password||'',
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
          phone: user.phone||'',
          profilePic:user.profilePic||'',
          password:user?.password||'',
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
          
       
        const appointments = await Appointment.find({ userId: userId }).sort({_id:-1})
        .populate('slotId')       
        .populate('doctorId')     
        .populate('patientId')    
        .populate('userId');
        
        
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
      
        const appointment=await Appointment.findOne({_id:appointmentId})
        const slot=await Slots.updateOne({_id:appointment?.slotId},{isbooked:false})
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
    updateProfilePic=async(userId: string, profilePic: string): Promise<SuccessResponse> =>{
      try {
      
        if (!userId) {
          throw new Error(`user with ID ${userId} not found.`);
        }
        const updateProfilePic = await User.updateOne(
          { _id: userId },
          { $set: { profilePic: profilePic } }
        )
        
      
        return {
          status: 'success',
          message: 'Slot assigned successfully',
        };
      } catch (error: any) {
        console.error("Error in slot creation:", error);
        throw new Error(error.message);
      }
    }

    chatwithDoctor=async(userId: string, appointmentId: string): Promise<SuccessResponse> =>{
      try {
        
        if (!userId) {
          throw new Error(`User with ID ${userId} not found.`);
        }
    
      
        if (!appointmentId) {
          throw new Error(`Appointment with ID ${appointmentId} not found.`);
        }
        const chatter=await Appointment.findOne({_id:appointmentId,userId:userId})
        
        
        const existingRoom = await ChatRoom.findOne({ patient: userId, doctor:chatter?.doctorId });
       
        if (existingRoom) {
          
          return {
            status: existingRoom?._id.toString(),
            message: "Chat room already exists.",
          };
        }
    
        
        const newChatRoom = new ChatRoom({
          patient: userId,
          doctor: chatter?.doctorId, 
        });
    
      
        const savedRoom = await newChatRoom.save();
    
        
        return {
          status: savedRoom?._id.toString(),
          message: "Chat room created successfully",
        };
      } catch (error: any) {
        console.error("Error in chatroom:", error);
        throw new Error(error.message);
      }
    }

    sendMessage=async(roomId: string, message:any): Promise<SuccessResponse>=> {
      try {
        
        if (!roomId) {
          throw new Error(`User with ID ${roomId} not found.`);
        }
    
      
        if (!message) {
          throw new Error(`Appointment with ID ${message} not found.`);
        }

        const chatter=await ChatRoom.findOne({_id:roomId})
        const updateChatter=await ChatRoom.updateOne({_id:roomId},{$set:{lastMessage:message?.content}})
        
        
        const createMsg = await Message.create({sender:chatter?.patient,receiver:chatter?.doctor,roomId,content:message?.content});
        io.to(roomId).emit("message", {createMsg})
        return {
          status: 'sucess',
          message: "Chat room created successfully",
        };
      } catch (error: any) {
        console.error("Error in chatroom:", error);
        throw new Error(error.message);
      }
    }
    getMessage=async(roomId: string): Promise<Messages>=> {
      try {
        
        if (!roomId) {
          throw new Error(`User with ID ${roomId} not found.`);
        }
        const chatRoomUp=await ChatRoom.updateOne({_id:roomId},{$set:{isReadUc:0}})
        const readmessage = await Message.updateMany({roomId:roomId},{$set:{isRead:true}});
         const message = await Message.find({roomId:roomId});
       

        return message
      } catch (error: any) {
        console.error("Error in chatroom:", error);
        throw new Error(error.message);
      }
    }
    getChatMembers=async(userId: string): Promise<ChatMembers>=>{
      try {
        
        if (!userId) {
          throw new Error(`User with ID ${userId} not found.`);
        }
         const message = await ChatRoom.find({patient:userId}).populate('doctor');
         

        return message
      } catch (error: any) {
        console.error("Error in chatroom:", error);
        throw new Error(error.message);
      }
    }
    slotAsign = async (userId: string, slotData:any): Promise<SuccessResponse> => {
      try {
        const existingSlot = await Slots.findOne({_id:slotData._id,isBooked:true});
    
        if (existingSlot) {
          throw new Error(`Slot already booked for this time range.`);
        }
    
        const data = await Slots.updateOne({_id:slotData._id},{$set:{isBooked:false}});
    
        if (!data) {
          throw new Error(`Doctor with ID ${userId} not found.`);
        }
    
        return {
          status: 'sucess',
          message: "Chat room created successfully",
        };
      } catch (error: any) {
        console.error("Error in slot creation:", error);
        throw new Error(error.message);
      }
    }
    getcompleteAppointment=async(userId: string): Promise<Appointments>=> {
      try {
        
        if (!userId) {
          throw new Error(`User with ID ${userId} not found.`);
        }
        const appointments = await Appointment.find({ userId: userId, status:'completed' }).sort({_id:-1})
        .populate('slotId')       
        .populate('doctorId')     
        .populate('patientId')    
        .populate('userId');
         

        return appointments
      } catch (error: any) {
        console.error("Error in chatroom:", error);
        throw new Error(error.message);
      }
    }
    userReview=async(userId: string, Review: ReviewData): Promise<ReviewOutput> =>{
      try {
        
        if (!userId) {
          throw new Error(`User with ID ${userId} not found.`);
        }
    
      
        if (!Review) {
          throw new Error(`Appointment with ID ${Review} not found.`);
        }

        const data = await Reviews.create({
          userId,
          ...Review, 
        });
        
       
        return {
          reviewText:data?.reviewText,
          rating:data?.rating,
          createdAt:data?.createdAt.toString()
        };
      } catch (error: any) {
        console.error("Error in chatroom:", error);
        throw new Error(error.message);
      }
    }
    googleLogin=async(GoogleUser: GoogleUser): Promise<GoogleUserOutput>=> {
      try {
        const users = await User.updateOne(
          { email: GoogleUser.email }, 
          {
            $set: {
              username: GoogleUser.displayName,
             
              phone:'Not Provider', 
            },
          },
          { upsert: true } 
        )

        const user=await User.findOne({email:GoogleUser.email}) 

  
         if (!user) {
      throw new Error("User not found after upsert.");
    }

    
    return {
      _id: user._id.toString(),
      username: user.username,
      email: user.email,
      profilePic:user?.profilePic||''
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

    getReview=async(doctorId: string): Promise<ReviewDatas> =>{
      
      try {
        
        if (!doctorId) {
          throw new Error(`User with ID ${doctorId} not found.`);
        }
        const reviewDatas = await Reviews.find({ doctorId: doctorId}).sort({_id:-1})
        .populate('userId');
         

        return reviewDatas
      } catch (error: any) {
        console.error("Error in chatroom:", error);
        throw new Error(error.message);
      }
      
    }
    getSlots=async(doctorId: string): Promise<SlotDatas> =>{
      try {
        
        if (!doctorId) {
          throw new Error(`User with ID ${doctorId} not found.`);
        }
        const SlotDatas = await Slots.find({ doctorId:doctorId,isUnavail:false})
        
        

        return SlotDatas
      } catch (error: any) {
        console.error("Error in chatroom:", error);
        throw new Error(error.message);
      }
    }

   } 
    
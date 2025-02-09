import {IDoctorRepository} from "../Interface/Repostry/doctorRepository.interface"
import {AddDoctorInput,AddDoctorOtpInput,AddDoctorOtpOutput,AddDoctorOutput,AddFormData,Appointments,DoctorSlotRequest,FindDoctorOtp, GetDoctorProfile, HospitalData, ResheduleData, SuccessResponse, UpdateDoctor ,Messages, ChatMembers, Transaction, Slots, PrescriptionFormData, PrescriptionData } from "../Interface/Repostry/doctorRepositery.types"
import Doctor from "../models/doctorModel";
import Otp from "../models/otpModel";
import Slot from "../models/Slots";
import { ProfileFormData } from "../Interface/Service/doctorService.type";
import Appointment from "../models/appointmentModel";
import ChatRoom from "../models/chatRoomModel";
import Message from "../models/messageModel";
import {io} from "../index";
import Transactions from "../models/Wallet";


import User from "../models/userModel";
import { error } from "console";
import Notification from "../models/Notification";
import Payment from "../models/paymentModel";
import Prescription from "../models/priscription";


export class DoctorRepository implements IDoctorRepository {
   addDoctor=async(doctorData: AddDoctorInput): Promise<AddDoctorOutput>=> {
       
   
      try {
        const doctor = await Doctor.create({
          ...doctorData,
         
        });
  
        return {
          _id: doctor._id.toString(),
          name: doctor.name,
          email: doctor.email,
          phone: doctor.phone,
          password:doctor.password,
          specialization:doctor.specialization,
          experience:doctor.experience,
          createdAt: doctor.createdAt,
          updatedAt: doctor.updatedAt,
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
   verifyOtp=async(doctorOtpData:FindDoctorOtp): Promise<AddDoctorOtpOutput>=> {
    try{
       const{userId}=doctorOtpData
     
       const otp=await Otp.findOne({userId:userId})
        
       if (!otp) {
         throw new Error("OTP not found or expired.");
     }
     if (otp.expiresAt < new Date()) {
       throw new Error("OTP has expired.");
     }
     
       return {
         _id:otp._id.toString(),
         doctorId:otp.userId.toString(),
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
   updateDoctorOtp=async(userId: string): Promise<UpdateDoctor> =>{
    try{
      const user=await Doctor.updateOne({_id:userId},{$set:{isOtpVerified:true}})
      return{message:'doctorOtp updated'}
    } catch (error: any) {
      console.error("Error find update Doctor:", error);
      if (error.code === 11000) {
        const field = Object.keys(error.keyValue)[0]; 
        const value = error.keyValue[field]; 
        error.message = `${field} '${value}' already exists.`;
      }
      throw new Error(error.message);
    }
   }
   getDoctorByEmail=async(email: string): Promise<AddDoctorOutput>=> {
    try{
  
      const user=await Doctor.findOne({email,isOtpVerified:true})
      
      if (!user) {
        throw new Error("User not found .");
    }
    if (user.isBlocked) {
      throw new Error("You are blocked.");
  }
    return {
      _id: user._id.toString(),
      name: user.name,
      email: user.email,
      phone: user.phone,
      specialization:user.specialization,
      experience:user.experience,
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
   getDoctorProfile = async (userId:string): Promise<GetDoctorProfile> => {
    try {

      
      const doctor = await Doctor.findOne({ _id: userId });
  
      
      
        if (!doctor) {
          throw new Error(`Doctor with ID ${userId} not found.`);
        }
        
      
  
      
      return {
        _id: doctor._id.toString(),
        name: doctor.name || "", 
        email: doctor.email || "",
        phone: doctor.phone || "",
        specialization: doctor.specialization || "",
        licenseImage: doctor.licenseImage || "",
        hospitalName: doctor.hospitalName || "",
        fees: doctor.fees?.toString() || "",
        licenseNumber: doctor.licenseNumber?.toString() || "",
        profilePic: doctor.profilePic || "",
        experience: doctor.experience.toString() || "",
        isVerified:doctor.isVerified,
        eWallet:doctor?.eWallet,
        password: doctor.password, 
        location:doctor.location,
        createdAt: doctor.createdAt,
        updatedAt: doctor.updatedAt,
      };
    } catch (error) {
      
      console.error("Error finding doctor:", error);
  
      
      throw new Error("Unable to fetch doctor profile. Please try again later.");
    }
  };
  updateDoctorProfile=async(formData:HospitalData,userId: string): Promise<GetDoctorProfile>=> {
    try {



      const {hospitalName,fees,licenseNumber}=formData
      
      const updateDoctor=await Doctor.updateOne({_id:userId},{$set:{
        
        hospitalName:hospitalName,
        
        fees:fees,
        licenseNumber:licenseNumber
      }})
    
      const doctor = await Doctor.findOne({ _id: userId });
       
        if (!doctor) {
          throw new Error(`Doctor with ID ${userId} not found.`);
        }
        
      
  
      
      return {
        _id: doctor._id.toString(),
        name: doctor.name || "", 
        email: doctor.email || "",
        phone: doctor.phone || "",
        specialization: doctor.specialization || "",
        licenseImage: doctor.licenseImage || "",
        hospitalName: doctor.hospitalName || "",
        fees: doctor.fees?.toString() || "",
        licenseNumber: doctor.licenseNumber?.toString() || "",
        profilePic: doctor.profilePic || "",
        experience: doctor.experience.toString() || "",
        isVerified:doctor.isVerified,
        password: doctor.password, 
        eWallet:doctor.eWallet,
        location:doctor.location,
        createdAt: doctor.createdAt,
        updatedAt: doctor.updatedAt,
      };
    } catch (error) {
      
      console.error("Error finding doctor:", error);
  
      
      throw new Error("Unable to fetch doctor profile. Please try again later.");
    }
  }
  changeProfile=async(userId: string, formData: ProfileFormData): Promise<GetDoctorProfile>=> {
    try {



      const {phone,name,hospitalName,fees,experience}=formData
      
      const updateDoctor=await Doctor.updateOne({_id:userId},{$set:{
        name:name,
        phone:phone,
        hospitalName:hospitalName,
        
        fees:fees,
        experience:experience

       
      }})
    
      const doctor = await Doctor.findOne({ _id: userId });
       
        if (!doctor) {
          throw new Error(`Doctor with ID ${userId} not found.`);
        }
        
      
  
      
      return {
        _id: doctor._id.toString(),
        name: doctor.name || "", 
        email: doctor.email || "",
        phone: doctor.phone || "",
        specialization: doctor.specialization || "",
        licenseImage: doctor.licenseImage || "",
        hospitalName: doctor.hospitalName || "",
        fees: doctor.fees?.toString() || "",
        eWallet:doctor.eWallet,
        licenseNumber: doctor.licenseNumber?.toString() || "",
        profilePic: doctor.profilePic || "",
        experience: doctor.experience.toString() || "",
        isVerified:doctor.isVerified,
        password: doctor.password, 
        location:doctor.location,
        createdAt: doctor.createdAt,
        updatedAt: doctor.updatedAt,
      };
    } catch (error) {
      
      console.error("Error finding doctor:", error);
  
      
      throw new Error("Unable to fetch doctor profile. Please try again later.");
    }
  }
  changePassword=async(userId: string, hashedPassword: string, oldPassword: string): Promise<GetDoctorProfile>=> {
    try{

      const doctor=await Doctor.findOne({_id:userId})
      if (!doctor) {
        throw new Error(`Doctor with ID ${userId} not found.`);
      }
      const userUpdate=await Doctor.updateOne({_id:userId},{$set:{password:hashedPassword}})
      return {
        _id: doctor._id.toString(),
        name: doctor.name || "", 
        email: doctor.email || "",
        phone: doctor.phone || "",
        specialization: doctor.specialization || "",
        licenseImage: doctor.licenseImage || "",
        hospitalName: doctor.hospitalName || "",
        fees: doctor.fees?.toString() || "",
        licenseNumber: doctor.licenseNumber?.toString() || "",
        profilePic: doctor.profilePic || "",
        experience: doctor.experience.toString() || "",
        eWallet:doctor.eWallet,
        isVerified:doctor.isVerified,
        password: doctor.password, 
        location:doctor?.location,
        createdAt: doctor.createdAt,
        updatedAt: doctor.updatedAt,
      };

    }catch(error:any){
      console.error("Error find loginUser:", error);
      
      throw new Error(error.message);
    }
  }
  
getAppointments=async(doctorId: string): Promise<Appointments>=> {
  try {
      
   
    const appointments = await Appointment.find({ doctorId: doctorId }).sort({_id:-1})
    .populate('slotId')       
    .populate('doctorId')     
    .populate('patientId') 
    .populate('paymentId')   
    .populate('userId');
    
    
    if (!appointments) {
      throw new Error(`Doctor with ID ${doctorId} not found.`);
    }
  
    return appointments
  } catch (error: any) {
    console.error("Error in slot creation:", error);
    throw new Error(error.message);
  }
}
resheduleAppointment=async(doctorId: string, payloadData: ResheduleData): Promise<SuccessResponse> =>{
  try {
      
    const {date,startTime,endTime,appointmentId}=payloadData
   
    const appointments = await Appointment.findOne({ doctorId: doctorId,_id:appointmentId })
    
    const slotUpdate=await Slot.updateOne({_id:appointments?.slotId},{$set:{date:date,startTime:startTime,endTime:endTime}})
    const updateAppointment=await Appointment.updateOne({_id:appointmentId},{$set:{status:'c'}})
    if (!appointments) {
      throw new Error(`Doctor with ID ${doctorId} not found.`);
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
completeAppointment=async(doctorId: string, appointmentId: string): Promise<SuccessResponse> =>{
  try {
      
    
    const updateAppointment=await Appointment.updateOne({_id:appointmentId},{$set:{status:'completed'}})
    if (!doctorId) {
      throw new Error(`Doctor with ID ${doctorId} not found.`);
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
cancelAppointment = async (doctorId: string, appointmentId: string): Promise<SuccessResponse> => {
  try {
    if (!doctorId) {
      throw new Error("Doctor ID is required.");
    }

    // Fetch appointment details and populate user reference
    const appointment: any = await Appointment.findOne({ _id: appointmentId }).populate('paymentId');
    console.log(appointment)
    if (!appointment) {
      throw new Error("Appointment not found.");
    }

    // Update appointment status to 'canceled'
    await Appointment.updateOne({ _id: appointmentId }, { $set: { status: 'canceled' } });

    // Refund amount to user's wallet
   
    await Doctor.updateOne(
      { _id: appointment.doctorId },
      { $inc: { eWallet: -appointment.paymentId.amount } } 
    );
    await User.updateOne({_id:appointment.userId},{$inc:{eWallet:appointment?.paymentId?.amount}})
   const transaction:any= await Transactions.findOne({id:appointment?.paymentId?.transactionId,doctorId})
   
    
      
      await Transactions.updateOne({_id:transaction._id},{$set:{type:'Refund',amount:-appointment?.paymentId?.amount,date:new Date()}})
    

    return {
      status: 'success',
      message: 'Appointment canceled successfully, and refund processed.',
    };
  } catch (error: any) {
    console.error("Error in appointment cancellation:", error);
    throw new Error(error.message);
  }
};

updateProfilepic=async(doctorId: string, profilePic: string): Promise<SuccessResponse> =>{
  try {
      
    
    const updateProfilePic = await Doctor.updateOne(
      { _id: doctorId },
      { $set: { profilePic: profilePic } }
    )
    if (!doctorId) {
      throw new Error(`Doctor with ID ${doctorId} not found.`);
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

chatwithUser=async(doctorId: string, appointmentId: string): Promise<SuccessResponse> =>{
  try {
    
    if (!doctorId) {
      throw new Error(`User with ID ${doctorId} not found.`);
    }

  
    if (!appointmentId) {
      throw new Error(`Appointment with ID ${appointmentId} not found.`);
    }
    const chatter=await Appointment.findOne({_id:appointmentId,doctorId:doctorId})
    
    
    const existingRoom = await ChatRoom.findOne({ patient: chatter?.userId, doctor:doctorId });
   
    if (existingRoom) {
      
      return {
        status: existingRoom?._id.toString(),
        message: "Chat room already exists.",
      };
    }

    
    const newChatRoom = new ChatRoom({
      patient: chatter?.userId,
      doctor: doctorId, 
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

sendMessage = async (roomId: string, message:any): Promise<SuccessResponse> => {
  try {
    // Validate inputs
    if (!roomId) {
      throw new Error("Room ID is required.");
    }

    if (!message) {
      throw new Error("Message content is required.");
    }

    // Find the chat room
    const chatter = await ChatRoom.findOne({ _id: roomId })
    if (!chatter) {
      throw new Error(`Chat room with ID ${roomId} not found.`);
    }
    console.log("Emitting linkNotification to room:", roomId);
    
    await ChatRoom.updateOne({ _id: roomId }, { $set: { lastMessage: message?.content} });
    const isLink = /^https?:\/\/[^\s$.?#].[^\s]*$/i.test( message?.content);
    const messageContent = isLink
      ? "Video call "  // If it's a link, label it as "Video call invitation"
      :  message?.content ;
    const updatedRoom = await ChatRoom.findOne({ _id: roomId });
    console.log('Updated Chat Room:', updatedRoom);
    const createMsg = await Message.create({
      sender: chatter.doctor,
      receiver: chatter.patient,
      roomId,
      content:message?.content,
    });
     
     io.to(roomId).emit("message", {createMsg})
     if (isLink) {
      console.log("Emitting linkNotification event:", {
        message: "A video call invitation has been shared",
        link: message.content,
        senderId:chatter.doctor,
        timestamp: message.timestamp,
      });

      // Emit a separate event for link notifications
      io.to(roomId).emit("linkNotification", {
        message: "A video call invitation has been shared",
        link:message.content,
        senderId:chatter.doctor,
        timestamp: message.timestamp,
      });
    }

    return {
      status: "success",
      message: "Message sent successfully.",
    };
  } catch (error: any) {
    console.error("Error in sendMessage doctor:", error);
    throw new Error(error.message);
  }
};

getMessage=async(roomId: string): Promise<Messages>=> {
  try {
    
    if (!roomId) {
      throw new Error(`User with ID ${roomId} not found.`);
    }

    const chatRoomUp=await Message.updateMany({roomId:roomId},{$set:{isRead:true}})
     const message = await Message.find({roomId:roomId});

    return message
  } catch (error: any) {
    console.error("Error in chatroom:", error);
    throw new Error(error.message);
  }
}
getChatMembers=async(doctorId: string): Promise<ChatMembers>=>{
  try {
    
    if (!doctorId) {
      throw new Error(`User with ID ${doctorId} not found.`);
    }

     const message = await ChatRoom.find({doctor:doctorId}).populate('patient');
     

    return message
  } catch (error: any) {
    console.error("Error in chatroom:", error);
    throw new Error(error.message);
  }
}

forgotPasswordOtp=async(email: string): Promise<SuccessResponse> =>{
  try {
      
    
    const doctor = await Doctor.findOne(
      { email: email },
      
    )
    if (!email) {
      throw new Error(`Doctor with ID ${email} not found.`);
    }
  
    return {
      status: doctor?._id.toString()||'',
      message: 'Slot assigned successfully',
    };
  } catch (error: any) {
    console.error("Error in slot creation:", error);
    throw new Error(error.message);
  }
}

forgotPassword=async(userId: string): Promise<SuccessResponse>=> {
  try{
    
  
    const otp=await Otp.findOne({userId:userId})
     
    if (!otp) {
      throw new Error("OTP not found or expired.");
  }
  if (otp.expiresAt < new Date()) {
    throw new Error("OTP has expired.");
  }
  
    return {
      status: otp.otpCode,
      message: "Message sent successfully.",
    };
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

updateDoctorPassword=async(userId:string,password:string):Promise<SuccessResponse>=>{
try{
  const user=await Doctor.updateOne({_id:userId},{$set:{password}})
  return {
    status: "success",
    message: "Message sent successfully.",
  };
} catch (error: any) {
  console.error("Error find update Doctor:", error);
  if (error.code === 11000) {
    const field = Object.keys(error.keyValue)[0]; 
    const value = error.keyValue[field]; 
    error.message = `${field} '${value}' already exists.`;
  }
  throw new Error(error.message);
}
}
createSlots = async (doctorId: string, slotData: any[]): Promise<{ status: string; message: string }> => {
  try {
    // Validate input
    if (!doctorId || !slotData.length) {
      throw new Error("Doctor ID and slot data are required.");
    }

    // Fetch existing slots for the same doctor
    const existingSlots = await Slot.find({ doctorId });

    // Filter slotData to keep only new slots (not already in the database)
    const newSlots = slotData.filter((newSlot) =>
      !existingSlots.some(
        (existingSlot) =>
          existingSlot.day === newSlot.day &&
          new Date(existingSlot.date).toISOString() === new Date(newSlot.date).toISOString()
      )
    );

    
    if (newSlots.length === 0) {
      throw error('slot alredy created')
    }
    
    // Insert only new slots
    await Slot.insertMany(newSlots.map(slot => ({ ...slot, doctorId })));

    return {
      status: "success",
      message: "New slots created successfully.",
    };
  } catch (error: any) {
    console.error("Error creating slots:", error);

    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      const value = error.keyValue[field];
      error.message = `${field} '${value}' already exists.`;
    }

    throw new Error(error.message || "Failed to create slots.");
  }
};


getWalletHisotry=async(doctorId: string): Promise<Transaction>=> {
  try {
    
    if (!doctorId) {
      throw new Error(`User with ID ${doctorId} not found.`);
    }

     const historys = await Transactions.find({doctorId:doctorId}).populate('userId');
     

    return historys
  } catch (error: any) {
    console.error("Error in chatroom:", error);
    throw new Error(error.message);
  }
}
getSlots=async(doctorId: string): Promise<Slots>=> {
  try {
    
    if (!doctorId) {
      throw new Error(`User with ID ${doctorId} not found.`);
    }

     const slot = await Slot.find({doctorId:doctorId})
     const slots=[...new Set(slot)]

    return slots
  } catch (error: any) {
    console.error("Error in chatroom:", error);
    throw new Error(error.message);
  }
}
asignLeaveDays = async (doctorId: string, leaveDays:any): Promise<SuccessResponse> => {
  try {
   

    
    const result = await Slot.updateMany(
      {
        doctorId: doctorId,
        date: { $in:leaveDays }, // Match leaveDays
      },
      {
        $set: { isUnavail: true }, // Set isUnavailable to true
      }
    );

    return {
      status: "success",
      message: `slots marked as unavailable.`,
    };
  } catch (error: any) {
    console.error("Error updating leave days:", error);

    // Handle duplicate key error or any other specific error codes if needed
    if (error.code === 11000) {
      throw new Error("Duplicate key error while updating slots.");
    }
    
    // Rethrow error with custom message
    throw new Error(error.message || "Failed to update slots for leave days.");
  }
};
updateSlots = async (doctorId: string, slotData: any[]): Promise<SuccessResponse> => {
  try {
    // Validate input
    if (!doctorId || !slotData.length) {
      throw new Error("Doctor ID and slot data are required.");
    }
 console.log(doctorId,slotData)
    // Fetch existing slots for the same doctor
    const existingSlots = await Slot.find({ doctorId });
    if (existingSlots.length === 0) {
      throw new Error("No existing slots found for this doctor.");
    }

    const existingWorkingDays = existingSlots[existingSlots.length-1].workingDays;
    console.log(existingWorkingDays)

    // Filter slotData to keep only new slots (not already in the database)
    const newSlots = slotData.filter((newSlot) =>
      !existingSlots.some(
        (existingSlot) =>
          existingSlot.day === newSlot.day &&
          new Date(existingSlot.date).toISOString() === new Date(newSlot.date).toISOString()
      )
    );

    // If no new slots remain, return a message
    if (newSlots.length === 0) {
      return {
        status: "error",
        message: "All requested slots already exist. No new slots were created.",
      };
    }

    // Update new slots with the combined working days
    const updatedData = newSlots.map(item => ({
      ...item,
      workingDays: [...new Set([...item.workingDays, ...existingWorkingDays])]
    }));

    // Insert the new slots with the doctorId
    await Slot.insertMany(updatedData.map(slot => ({ ...slot, doctorId })));

    return {
      status: "success",
      message: "New slots created successfully.",
    };
  } catch (error: any) {
    console.error("Error creating slots:", error);
  
    // Handle duplicate key error (code 11000 for MongoDB)
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      const value = error.keyValue[field];
      error.message = `${field} '${value}' already exists.`;
    }
  
    // Rethrow error with custom message
    throw new Error(error.message || "Failed to create slots.");
  }
};

blockSlots=async(doctorId: string, slotId: string): Promise<SuccessResponse>=> {

   try{ 

    console.log(doctorId,slotId)
  if (!doctorId) {
    throw new Error(`User with ID ${doctorId} not found.`);
  }

   const slot = await Slot.updateOne({_id:slotId,doctorId},{$set:{isUnavail:true}})


   return {
    status: "success",
    message: "Message sent successfully.",
  };
} catch (error: any) {
  console.error("Error in block slots:", error);
  throw new Error(error.message);
}
}
Appointments=async(doctorId: string): Promise<Appointments>=> {
  try {
      
   console.log('hai')
    const appointments = await Appointment.find({ doctorId: doctorId ,status:'completed'}).sort({_id:-1})
    .populate('slotId')       
    .populate('doctorId')     
    .populate('patientId') 
    .populate('paymentId')   
    .populate('userId');
    
    
    if (!appointments) {
      throw new Error(`Doctor with ID ${doctorId} not found.`);
    }
  
    return appointments
  } catch (error: any) {
    console.error("Error in slot creation:", error);
    throw new Error(error.message);
  }
}

getNotification=async(doctorId: string): Promise<any> =>{
  try {
      
    console.log('hai')
     const notifications = await Notification.find({ doctorId: doctorId}).sort({_id:-1})
     
     .populate('userId');
     
     
     if (!notifications) {
       throw new Error(`Doctor with ID ${doctorId} not found.`);
     }
   
     return notifications
   } catch (error: any) {
     console.error("Error in slot creation:", error);
     throw new Error(error.message);
   }
}

addPriscription = async (doctorId: string, data: PrescriptionFormData): Promise<SuccessResponse> => {
  try {
    if (!doctorId) {
      throw new Error(`Doctor ID is required.`);
    }
    await Appointment.updateOne({_id: data.appointmentId},{$set:{prescriptionAdded:true}})
    const prescription = await Prescription.create({
      doctorId,
      appointmentId: data.appointmentId,
      patientName: data.patientName,
      dosage: data.dosage,
      medication: data.medication,
      instructions: data.instructions
    });

    await prescription.save();

    return {
      status: 'success',
      message: 'Prescription added successfully',
    };
  } catch (error: any) {
    console.error("Error in prescription creation:", error);
    throw new Error(error.message);
  }
};
getPriscription=async(doctorId: string): Promise<PrescriptionData>=> {
  try {
      
    
     const prescription = await Prescription.find({ doctorId: doctorId}).sort({_id:-1})
     
     
     
     
     if (!prescription) {
       throw new Error(`Doctor with ID ${doctorId} not found.`);
     }
   
     return prescription
   } catch (error: any) {
     console.error("Error in slot creation:", error);
     throw new Error(error.message);
   }
}

}
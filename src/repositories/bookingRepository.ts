import { IBookingRepository } from "../Interface/Repostry/bookingRepository.interface";
import { ConfirmData, doctorData, DoctorDetials, IPayment, OutPutPatient, Patient, SelectedSlots, SlotData, SuccessResponse } from "../Interface/Repostry/bookingRepository.type";
import Doctor from "../models/doctorModel";
import Slots from "../models/Slots"
import Patients from "../models/patientModel";
import Payment from "../models/paymentModel";
import Appointment from "../models/appointmentModel";
import Transaction from "../models/Wallet";
export class BookingRepository implements IBookingRepository{

    getDoctors=async(userId: string): Promise<doctorData|null> =>{
         
    try {
         
        if (!userId) {
             return null
          }
        const doctors = await Doctor.find({isBlocked:false,isDeleted:false,isOtpVerified:true,isVerified:true});
      if (!doctors) {
          throw new Error(`Doctor with doctors not found.`);
        }
      
        return doctors
         
        
      } catch (error: any) {
        console.error("Error in slot creation:", error);
        throw new Error(error.message);
      }
  }    
  
  doctorDetails=async(doctorId: string): Promise<DoctorDetials>=> {
    try {
         
      
      const doctor = await Doctor.findOne({_id:doctorId});
    if (!doctor) {
        throw new Error(`Doctor with doctor not found.`);
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
        location:doctor.location,
        createdAt: doctor.createdAt,
        updatedAt: doctor.updatedAt,
      } 
       
      
    } catch (error: any) {
      console.error("Error in slot creation:", error);
      throw new Error(error.message);
    }
  }
   getSlots=async(doctorId: string,userId:string): Promise<SlotData> =>{
    try {
         
      
      const slots = await Slots.find({doctorId:doctorId,isBooked:true});
    if (!slots) {
        throw new Error(`Doctor with doctor not found.`);
      }
    
      return slots
        
       
      
    } catch (error: any) {
      console.error("Error in slot creation:", error);
      throw new Error(error.message);
    }
   }

   bookingSlots=async(userId:string,doctorId: string, selectedSlots: SelectedSlots): Promise<SuccessResponse> =>{
    try {
         
      const existingSlot = await Slots.findOne({ _id: selectedSlots });
  
      if (existingSlot && existingSlot.isBooked === true) {
        
        return {
          status:existingSlot._id.toString(),
          success: false,
          message: 'This slot is already booked.',
        };
      }
      const slots = await Slots.updateOne({_id:selectedSlots,doctorId:doctorId},{$set:{isBooked:true,userId:userId}});

      
    if (!slots) {
        throw new Error(`Doctor with slot not found.`);
      }
    
      return {
        status:'booked',
        success:true,
        message:'slot status successfully change'
      }
        
       
      
    } catch (error: any) {
      console.error("Error in slot creation:", error);
      throw new Error(error.message);
    }
   }
   patientDetails=async(userId: string, patientDetails: Patient): Promise<OutPutPatient>=> {
     
   
    try {
         
     
      const patientDetail=await Patients.create({
        userId:userId,
        ...patientDetails
      })

      
    if (!patientDetail) {
        throw new Error(`Doctor with slot not found.`);
      }
    
      return {
       _id:patientDetail?._id.toString(),
       doctorId:patientDetail?.doctorId.toString(),
       userId:patientDetail?.userId.toString(),
       firstName:patientDetail?.firstName,
       lastName:patientDetail?.lastName,
       age:patientDetail?.age,
       gender:patientDetail?.gender,
       reason:patientDetail?.reason,
       slotId:patientDetail?.slotId.toString(),
       
      }
        
       
      
    } catch (error: any) {
      console.error("Error in slot creation:", error);
      throw new Error(error.message);
    }
   }

   paymentDetails=async(userId: string, PaymentData: IPayment): Promise<SuccessResponse>=> {
    try {
         const{slotId,doctorId,txnid,amount,patientId}=PaymentData
     
      const paymentDetail=await Payment.create({
        userId:userId,
        slotId:slotId,
        doctorId:doctorId,
        transactionId:txnid,
        amount:amount,
        patientId:patientId
        
      })
      const wallet=await Doctor.updateOne({_id:doctorId},{$inc:{eWallet:amount}})
      const walletDetails=await Transaction.create({
        id:txnid,
        doctorId:doctorId,
        date:new Date(),
        type:'Consultation Fee',
        amount:amount,
        status:'Completed',
        userId:userId
      })
      
    if (!paymentDetail) {
        throw new Error(`Doctor with slot not found.`);
      }
    
      return {
        status:'pending',
        success:true,
        message:'slot status successfully change'
      }
        
       
      
    } catch (error: any) {
      console.error("Error in slot creation:", error);
      throw new Error(error.message);
    }
   }
   paymentSuccess=async(userId: string, txnid:string): Promise<SuccessResponse> =>{
    try {
         
      const payment=await Payment.findOne({transactionId:txnid})
      const slotUpdate=await Slots.updateOne({_id:payment?.slotId},{$set:{isBooked:true}})
      const paymentDetail=await Payment.updateOne({transactionId:txnid},{$set:{paymentStatus:'completed'}})
      const appointment=await Appointment.create({
        userId:userId,
        slotId:payment?.slotId,
        doctorId:payment?.doctorId,
        patientId:payment?.patientId,
        paymentId:payment?._id,
        
        
      })
      
    if (!paymentDetail) {
        throw new Error(`Doctor with slot not found.`);
      }
    
      return {
        status:'completed',
        success:true,
        message:'slot status successfully change'
      }
        
       
      
    } catch (error: any) {
      console.error("Error in slot creation:", error);
      throw new Error(error.message);
    }
   }
     }

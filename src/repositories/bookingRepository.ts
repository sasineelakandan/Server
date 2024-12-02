import { IBookingRepository } from "../interface/repositories/bookingRepository.interface";
import { doctorData, DoctorDetials, SelectedSlots, SlotData, SuccessResponse } from "../interface/repositories/bookingRepository.type";
import Doctor from "../models/doctorModel";
import Slot from "../models/slotsModel"

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
        state: doctor.state || "",
        street: doctor.street || "",
        city: doctor.city || "",
        createdAt: doctor.createdAt,
        updatedAt: doctor.updatedAt,
      } 
       
      
    } catch (error: any) {
      console.error("Error in slot creation:", error);
      throw new Error(error.message);
    }
  }
   getSlots=async(doctorId: string): Promise<SlotData> =>{
    try {
         
      
      const slots = await Slot.find({doctorId:doctorId,booked:false});
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
         
      const existingSlot = await Slot.findOne({ _id: selectedSlots });
  
      if (existingSlot && existingSlot.status === 'booked') {
        
        return {
          status:existingSlot.status,
          success: false,
          message: 'This slot is already booked by another user.',
        };
      }
      const slots = await Slot.updateOne({_id:selectedSlots,doctorId:doctorId},{$set:{status:"booked",userId:userId,booked:true}});

      
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
     }

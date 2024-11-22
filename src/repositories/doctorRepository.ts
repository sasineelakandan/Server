import {IDoctorRepository} from "../interface/repositories/doctorRepository.interface"
import {AddDoctorInput,AddDoctorOtpInput,AddDoctorOtpOutput,AddDoctorOutput,AddFormData,FindDoctorOtp, GetDoctorProfile, HospitalData, UpdateDoctor  } from "../interface/repositories/doctorRepositery.types"
import Doctor from "../models/doctorModel";
import Otp from "../models/otpModel";

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
  
      const user=await Doctor.findOne({email})
      
      if (!user) {
        throw new Error("User not found or expired.");
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
   getDoctorProfile = async (userId: string): Promise<GetDoctorProfile> => {
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
        password: doctor.password, 
        state: doctor.state || "",
        street: doctor.street || "",
        city: doctor.city || "",
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



      const {licenseImage,licenseImage1,hospitalName,city,state,street,fees,licenseNumber}=formData
      
      const updateDoctor=await Doctor.updateOne({_id:userId},{$set:{
        licenseImage:licenseImage,
        profilePic:licenseImage1,
        hospitalName:hospitalName,
        city:city,
        state:state,
        street:street,
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
        password: doctor.password, 
        state: doctor.state || "",
        street: doctor.street || "",
        city: doctor.city || "",
        createdAt: doctor.createdAt,
        updatedAt: doctor.updatedAt,
      };
    } catch (error) {
      
      console.error("Error finding doctor:", error);
  
      
      throw new Error("Unable to fetch doctor profile. Please try again later.");
    }
  }
  
}
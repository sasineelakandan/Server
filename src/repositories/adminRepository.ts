import { IAdminRepository } from "../interface/repositories/adminRepository.interface";
import { doctorData, SuccessResponse, userData } from "../interface/repositories/adminRepository.type";
import Doctor from "../models/doctorModel";
import User from "../models/userModel";

export class AdminRepository implements IAdminRepository{
   patientDetails = async (admin: string): Promise<userData | null> => {
    try {
      if (!admin) {
        
        return null;
      }
  
      
      const users = await User.find({isDelete:false});
  
      if (!users || users.length === 0) {
        return null
        
      }
  
      
      return users;
  
    } catch (error: any) {
      
      console.error("Error finding users:", error.message);
    
      return null
    }
  };
      isBlocked = async (email: string, userId: string): Promise<SuccessResponse> => {
      try {
        if (!userId) {
          return { success: false, message: "User ID is required" };
        }
    
        const user = await User.findOne({ _id: userId });
    
        if (!user) {
           throw new Error("User not found");
        }
    
        
        const updatedBlockStatus = !user.isBlock;
    
        const updateResult = await User.updateOne({ _id: userId }, { $set: { isBlock: updatedBlockStatus } });
    
        if (updateResult.modifiedCount > 0) {
          return { success: true };
        } else {
          return { success: false, message: "Failed to update block status" };
        }
    
      } catch (error) {
        console.error("Error finding or updating user:", error);
        throw new Error("Unable to fetch users. Please try again later.");
      }
    }

    isDelete=async(userId: string): Promise<SuccessResponse>=> {
      try {
        if (!userId) {
          return { success: false, message: "User ID is required" };
        }
    
        const user = await User.findOne({ _id: userId });
    
        if (!user) {
           throw new Error("User not found");
        }
    
        
        const updatedStatus = !user.isDelete;
    
        const updateResult = await User.updateOne({ _id: userId }, { $set: { isDelete: updatedStatus } });
    
        if (updateResult.modifiedCount > 0) {
          return { success: true };
        } else {
          return { success: false, message: "Failed to update block status" };
        }
    
      } catch (error) {
        console.error("Error finding or updating user:", error);
        throw new Error("Unable to fetch users. Please try again later.");
      }
    }

    isVerify=async(userId: string): Promise<SuccessResponse> =>{
      try {
        if (!userId) {
          return { success: false, message: "User ID is required" };
        }
    
        const doctors = await Doctor.findOne({ _id: userId });
    
        if (!doctors) {
           throw new Error("User not found");
        }
        console.log(doctors)
        
        const updatedStatus = !doctors.isVerified;
    
        const updateResult = await Doctor.updateOne({ _id: userId }, { $set: { isVerified: updatedStatus } });
    
        if (updateResult.modifiedCount > 0) {
          
          return { success: true };
        } else {
          return { success: false, message: "Failed to update block status" };
        }
    
      } catch (error) {
        console.error("Error finding or updating user:", error);
        throw new Error("Unable to fetch users. Please try again later.");
      }
    }

    doctorDetails=async(admin: string): Promise<doctorData | null>=> {
      try {
        if (!admin) {
          
          return null;
        }
    
        console.log(admin)
        const doctors = await Doctor.find({isDeleted:false,isOtpVerified:true,isVerified:false});
    
        if (!doctors || doctors.length === 0) {
          return null
          
        }
    
        
        return doctors;
    
      } catch (error: any) {
        
        console.error("Error finding users:", error.message);
      
        return null
      }
    }
    verifiedDoctors=async(admin: string): Promise<doctorData | null> =>{
      try {
        if (!admin) {
          
          return null;
        }
    
        
        const doctors = await Doctor.find({isDeleted:false,isOtpVerified:true,isVerified:true});
    
        if (!doctors || doctors.length === 0) {
          return null
          
        }
    
        
        return doctors;
    
      } catch (error: any) {
        
        console.error("Error finding users:", error.message);
      
        return null
      }
    }
    doctorBlock=async(doctorId: string): Promise<SuccessResponse> =>{
      try {
        if (!doctorId) {
          return { success: false, message: "User ID is required" };
        }
    
        const user = await Doctor.findOne({ _id: doctorId });
    
        if (!user) {
           throw new Error("doctor not found");
        }
    
        
        const updatedBlockStatus = !user.isBlocked;
    
        const updateResult = await Doctor.updateOne({ _id: doctorId }, { $set: { isBlocked: updatedBlockStatus } });
    
        if (updateResult.modifiedCount > 0) {
          return { success: true };
        } else {
          return { success: false, message: "Failed to update block status" };
        }
    
      } catch (error) {
        console.error("Error finding or updating user:", error);
        throw new Error("Unable to fetch users. Please try again later.");
      }
    }

    deleteDoctor=async(doctorId: string): Promise<SuccessResponse>=> {
      try {
        if (!doctorId) {
          return { success: false, message: "User ID is required" };
        }
    
        const user = await Doctor.findOne({ _id: doctorId });
    
        if (!user) {
           throw new Error("User not found");
        }
    
        
        const updatedStatus = !user.isDeleted;
    
        const updateResult = await Doctor.updateOne({ _id: doctorId }, { $set: { isDeleted: updatedStatus } });
    
        if (updateResult.modifiedCount > 0) {
          return { success: true };
        } else {
          return { success: false, message: "Failed to update block status" };
        }
    
      } catch (error) {
        console.error("Error finding or updating user:", error);
        throw new Error("Unable to fetch users. Please try again later.");
      }
    }
    }
    

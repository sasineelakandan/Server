import { IAdminRepository } from "../interface/repositories/adminRepository.interface";
import { SuccessResponse, userData } from "../interface/repositories/adminRepository.type";
import User from "../models/userModel";

export class AdminRepository implements IAdminRepository{
   patientDetails = async (admin: string): Promise<userData | null> => {
    try {
      if (!admin) {
        
        return null;
      }
  
      
      const users = await User.find({isDelete:false});
  
      if (!users || users.length === 0) {
        throw new Error("No users found.");
        
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
    
}
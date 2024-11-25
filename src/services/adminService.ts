import { IAdminRepository } from "../interface/repositories/adminRepository.interface";
import { IAdminService } from "../interface/services/adminService.interface";
import { AdminInputData, AdminOutputData, SuccessResponse, userData} from "../interface/services/adminService.type";
import { ADMIN_EMAIL, ADMIN_PASSWORD } from "../utils/constant";
import { AppError } from "../utils/errors";

import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateJWT";


export class AdminService implements IAdminService{

    private adminRepository:IAdminRepository
    constructor(adminRepository:IAdminRepository){
        this.adminRepository=adminRepository
    }

    adminLogin=async(email:string,password:string): Promise<AdminOutputData> =>{
        try{
        

            
            const envEmail = ADMIN_EMAIL;
            const envPassword = ADMIN_PASSWORD;
          
            if (!envEmail || !envPassword) {
              throw new Error("Environment variables for email or password are not set");
            }
          
            
            if (email === envEmail && password === envPassword) {
                const accessToken = generateAccessToken(envEmail, "admin");
                const refreshToken = generateRefreshToken(envEmail, "admin");
              return { admin: true,accessToken,refreshToken };
            } else {
              return { admin: false };
            }
          
        } catch (error: any) {
            console.log("Error in user service", error.message);
            throw new Error(error.message);
          }
    }
    patientDetails = async (admin: string): Promise<userData | null> => {
      try {
        if (!admin) {
          // If no admin identifier is provided, return null or an empty object
          return null;
        }
    
        // Fetch patient details from the repository
        const users = await this.adminRepository.patientDetails(admin);
    
        if (!users) {
          // Return null if no user details are found
          return null;
        }
    
        // Return the fetched user data
        return users;
    
      } catch (error: any) {
        console.log("Error in user service:", error.message);
      
        return null;
      }
    };
    
 isBlocked = async (email: string, userId: string): Promise<SuccessResponse> => {
  try {
    
    if (!email) {
      return { success: false, message: "Email is required" };
    }

    
    const users = await this.adminRepository.isBlocked(email, userId);

    if (!users) {
      return { success: false, message: "User not found or error fetching data" };
    }

  
    return { success: true, message: "User block status fetched successfully" };

  } catch (error: any) {
    console.log("Error in user service", error.message);
    return { success: false, message: `Error: ${error.message}` };  // Return error message
  }
}
   }
  

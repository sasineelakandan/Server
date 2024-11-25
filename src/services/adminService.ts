import { IAdminRepository } from "../interface/repositories/adminRepository.types";
import { IAdminService } from "../interface/services/adminService.interface";
import { AdminInputData, AdminOutputData } from "../interface/services/adminService.type";
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
}

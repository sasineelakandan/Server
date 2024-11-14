import { IUserService } from "../interface/services/userService.interface";
import { IuserRepository } from "../interface/repositories/userRepository.interface";
import { findOtp, OtpOutput, resendOtp, UserSignupInput,UserSignupOutput} from "../interface/services/userService.types";
import { encryptPassword,comparePassword } from "../utils/encription";
import { AppError } from "../utils/errors";

import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateJWT";


export class UserService implements IUserService{
    private userRepository:IuserRepository

    constructor(userRepository:IuserRepository){
        this.userRepository=userRepository
       
    }

   
    
      userSignup = async (userData: UserSignupInput): Promise<UserSignupOutput> => {
        try {
          const encryptedPassword = encryptPassword(userData.password);
    
          const user = await this.userRepository.addUser({
            ...userData,
            password: encryptedPassword,
          });
    
          const accessToken = generateAccessToken(user._id, "user");
          const refreshToken = generateRefreshToken(user._id, "user");
    
          return { ...user, accessToken, refreshToken };
        } catch (error: any) {
          console.log("Error in user service", error.message);
          throw new Error(error.message);
        }
      }
      verifyOtp=async(otpData:findOtp): Promise<OtpOutput> => {
        try{
          const {userId,otp}=otpData
          const userotp=await this.userRepository.verifyOtp({userId})
         if(userotp.otp!==otp){
          throw new Error("Invalid OTP.");
         }
         if(userotp.otp==otp){
          
          await this.userRepository.updateUserOtp(userId)
         }
        
        return {...userotp };
        } catch (error: any) {
          console.log("Error in verifyOtp", error.message);
          throw new Error(error.message);
        }
      }
     userLogin=async(email: string, password: string): Promise<UserSignupOutput>=>{
       try{
        const user = await this.userRepository.getUserByEmail(email);

        const isValidPassword = comparePassword(password, user.password);
        if (!isValidPassword) throw new AppError("Invalid Credentials", 401);
  
        const accessToken = generateAccessToken(user._id, "user");
        const refreshToken = generateRefreshToken(user._id, "user");
  
        return {
          _id: user._id,
          username: user.username,
          email: user.email,
          phone: user.phone,
          age: user.age,
          address: user.address,
          gender: user.gender,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          accessToken,
          refreshToken,
        };

       }catch (error: any) {
          console.log("Error in userLogin", error.message);
          throw new Error(error.message);
        }
     }
     
     
    }
import { IUserService } from "../interface/services/userService.interface";
import { IuserRepository } from "../interface/repositories/userRepository.interface";
import { UserSignupInput,UserSignupOutput} from "../interface/services/userService.types";
import { encryptPassword } from "../utils/encription";
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
}
import { UserSignupInput, UserSignupOutput,OtpOutput, findOtp,UserProfileOutput } from "./userService.types";

export interface IUserService {
  userSignup(userData: UserSignupInput): Promise<UserSignupOutput>;
  verifyOtp(otpData:findOtp): Promise<OtpOutput>
  userLogin(email: string, password: string): Promise<UserSignupOutput>;
  userProfile(profilePic:string,userId:string):Promise<UserProfileOutput>
}
import { UserSignupInput, UserSignupOutput,OtpOutput, findOtp,UserProfileOutput, Appointments, SuccessResponse } from "./userService.types";

export interface IUserService {
  userSignup(userData: UserSignupInput): Promise<UserSignupOutput>;
  verifyOtp(otpData:findOtp): Promise<OtpOutput>
  userLogin(email: string, password: string): Promise<UserSignupOutput>;
  userProfile(userId:string):Promise<UserProfileOutput>
  changeProfile(userId: string,name:string,phone:number):Promise<UserProfileOutput>
  changePassword(userId: string,oldPassword:string,newPassword:string):Promise<UserProfileOutput>
  getAppointments(userId:string):Promise<Appointments>
  cancelAppointments(userId:string,appointmentId:string):Promise<SuccessResponse>
  updateProfilePic(userId:string,profilePic:string):Promise<SuccessResponse>
}
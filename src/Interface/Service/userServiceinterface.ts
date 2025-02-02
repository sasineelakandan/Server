import { UserSignupInput, UserSignupOutput,OtpOutput, findOtp,UserProfileOutput, Appointments, SuccessResponse, Messages, ChatMembers, AppointmentSlot, AppointmentSlotOutput, ReviewData, ReviewOutput, GoogleUser, GoogleUserOutput, ReviewDatas, SlotDatas, Transaction } from "./userService.type";

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
  chatwithDoctor(userId:string,appointmentId:string):Promise<SuccessResponse>
  sendMessage(roomId:string,message:string):Promise<SuccessResponse>
  getMessage(roomId:string):Promise<Messages>
  getChatMembers(userId:string):Promise<ChatMembers>
  slotAsign(userId:string,slotData:AppointmentSlot):Promise<SuccessResponse>
  getcompleteAppointment(userId:string):Promise<Appointments>
  userReview(userId:string,Review:ReviewData,doctorId:string):Promise<ReviewOutput>
  googleLogin(GoogleUser:GoogleUser):Promise<GoogleUserOutput>
  getReview(doctorId:string):Promise<ReviewDatas>
  getSlots(doctorId:string):Promise<SlotDatas>
  getWalletHisotry(doctorId:string):Promise<Transaction>
}
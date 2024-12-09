import { promises } from "dns";
import {DoctorSignupInput,DoctorSignupOutput,FindDoctorOtp,DoctorOtpOutput,DoctorProfileOutput,FormData, ProfileFormData,SuccessResponse,DoctorSlotRequest, Appointments, ResheduleData,ChatMembers,Messages} from "./doctorService.type";

export interface IDoctorService {
  doctorSignup(doctorData:DoctorSignupInput): Promise<DoctorSignupOutput>;
  verifyOtp(otpData:FindDoctorOtp): Promise<DoctorOtpOutput>
  doctorLogin(email: string, password: string): Promise<DoctorSignupOutput>;
  doctorProfile(userId:string):Promise<DoctorProfileOutput>
  updateProfile(formData:FormData,userId:string):Promise<DoctorProfileOutput>
  changeProfile(userId:string,formData:ProfileFormData):Promise<DoctorProfileOutput>
  changePassword(userId: string,oldPassword:string,newPassword:string):Promise<DoctorProfileOutput>
  slotAsign(userId:string,slotData:DoctorSlotRequest):Promise<SuccessResponse>
  getAppointments(doctorId:string):Promise<Appointments>
  resheduleAppointment(doctorId:string,payloadData:ResheduleData):Promise<SuccessResponse>
  completeAppointment(doctorId:string,appointmentId:string):Promise<SuccessResponse>
  cancelAppointment(doctorId:string,appointmentId:string):Promise<SuccessResponse>
  updateProfilepic(doctorId:string,profilePic:string):Promise<SuccessResponse>
  chatwithUser(doctorId:string,appointmentId:string):Promise<SuccessResponse>
  sendMessage(roomId:string,message:string):Promise<SuccessResponse>
  getMessage(roomId:string):Promise<Messages>
  getChatMembers(userId:string):Promise<ChatMembers>
}
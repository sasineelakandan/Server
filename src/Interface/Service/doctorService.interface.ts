
import {DoctorSignupInput,DoctorSignupOutput,FindDoctorOtp,DoctorOtpOutput,DoctorProfileOutput,FormData, ProfileFormData,SuccessResponse,DoctorSlotRequest, Appointments, ResheduleData,ChatMembers,Messages, Transaction, Slots, PrescriptionFormData, PrescriptionData} from "./doctorService.type";

export interface IDoctorService {
  doctorSignup(doctorData:DoctorSignupInput): Promise<DoctorSignupOutput>;
  verifyOtp(otpData:FindDoctorOtp): Promise<DoctorOtpOutput>
  doctorLogin(email: string, password: string): Promise<DoctorSignupOutput>;
  doctorProfile(userId:string):Promise<DoctorProfileOutput>
  updateProfile(formData:FormData,userId:string):Promise<DoctorProfileOutput>
  changeProfile(userId:string,formData:ProfileFormData):Promise<DoctorProfileOutput>
  changePassword(userId: string,oldPassword:string,newPassword:string):Promise<DoctorProfileOutput>
  forgotPasswordOtp(email:string):Promise<SuccessResponse>
  getAppointments(doctorId:string):Promise<Appointments>
  resheduleAppointment(doctorId:string,payloadData:ResheduleData):Promise<SuccessResponse>
  completeAppointment(doctorId:string,appointmentId:string):Promise<SuccessResponse>
  cancelAppointment(doctorId:string,appointmentId:string):Promise<SuccessResponse>
  updateProfilepic(doctorId:string,profilePic:string):Promise<SuccessResponse>
  chatwithUser(doctorId:string,appointmentId:string):Promise<SuccessResponse>
  sendMessage(roomId:string,message:string):Promise<SuccessResponse>
  getMessage(roomId:string):Promise<Messages>
  getChatMembers(userId:string):Promise<ChatMembers>
  forgotPassword(otpDataa:any):Promise<SuccessResponse>
  createSlots(doctorId:string,slotData:any):Promise<SuccessResponse>
  getWalletHisotry(doctorId:string):Promise<Transaction>
  getSlots(doctorId:string):Promise<Slots>
  asignLeaveDays(doctorId:string,leaveDays:any):Promise<SuccessResponse>
  updateSlots(doctorId:string,slotData:any):Promise<SuccessResponse>
  blockSlots(doctorId:string,slotId:string):Promise<SuccessResponse>
  Appointments(doctorId:string):Promise<Appointments>
  getNotification(userId:string):Promise<Notification>
  addPriscription(doctorId:string,data:PrescriptionFormData):Promise<SuccessResponse>
  getPriscription(doctorId:string):Promise<PrescriptionData>
  
}
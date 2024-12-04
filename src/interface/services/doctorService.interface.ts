import {DoctorSignupInput,DoctorSignupOutput,FindDoctorOtp,DoctorOtpOutput,DoctorProfileOutput,FormData, ProfileFormData,SuccessResponse,DoctorSlotRequest, Appointments} from "./doctorService.type";

export interface IDoctorService {
  doctorSignup(doctorData:DoctorSignupInput): Promise<DoctorSignupOutput>;
  verifyOtp(otpData:FindDoctorOtp): Promise<DoctorOtpOutput>
  doctorLogin(email: string, password: string): Promise<DoctorSignupOutput>;
  doctorProfile(userId:string,profilePic:string):Promise<DoctorProfileOutput>
  updateProfile(formData:FormData,userId:string):Promise<DoctorProfileOutput>
  changeProfile(userId:string,formData:ProfileFormData):Promise<DoctorProfileOutput>
  changePassword(userId: string,oldPassword:string,newPassword:string):Promise<DoctorProfileOutput>
  slotAsign(userId:string,slotData:DoctorSlotRequest):Promise<SuccessResponse>
  getAppointments(doctorId:string):Promise<Appointments>
}
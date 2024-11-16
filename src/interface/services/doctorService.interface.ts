import {DoctorSignupInput,DoctorSignupOutput,FindDoctorOtp,DoctorOtpOutput} from "./doctorService.type";

export interface IDoctorService {
  doctorSignup(doctorData:DoctorSignupInput): Promise<DoctorSignupOutput>;
  verifyOtp(otpData:FindDoctorOtp): Promise<DoctorOtpOutput>
  doctorLogin(email: string, password: string): Promise<DoctorSignupOutput>;

}
import {AddDoctorInput,AddDoctorOtpOutput,AddDoctorOutput,FindDoctorOtp,UpdateDoctor,AddFormData, GetDoctorProfile, HospitalData, } from '../repositories/doctorRepositery.types'
import { ProfileFormData } from '../services/doctorService.type';

export interface IDoctorRepository{
    addDoctor(doctorData:AddDoctorInput):Promise<AddDoctorOutput>
    verifyOtp(doctorOtpData:FindDoctorOtp):Promise<AddDoctorOtpOutput>
    getDoctorByEmail(email: string) : Promise<AddDoctorOutput>;
    updateDoctorOtp(userId:string):Promise<UpdateDoctor>
    getDoctorProfile(userId:string,profilePic:string):Promise<GetDoctorProfile>
    updateDoctorProfile(formData:HospitalData,userId:string):Promise<GetDoctorProfile>
    changeProfile(userId:string,formData:ProfileFormData):Promise<GetDoctorProfile>
    changePassword(userId:string,newpassword:string,oldPassword:string):Promise<GetDoctorProfile>
}
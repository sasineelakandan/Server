import {AddDoctorInput,AddDoctorOtpOutput,AddDoctorOutput,FindDoctorOtp,UpdateDoctor,AddFormData, GetDoctorProfile, HospitalData,DoctorSlotRequest,SuccessResponse, Appointments, ResheduleData,ChatMembers,Messages, Transaction, Slots } from '../Repostry/doctorRepositery.types'
import { ProfileFormData } from '../Service/doctorService.type';

export interface IDoctorRepository{
    addDoctor(doctorData:AddDoctorInput):Promise<AddDoctorOutput>
    verifyOtp(doctorOtpData:FindDoctorOtp):Promise<AddDoctorOtpOutput>
    getDoctorByEmail(email: string) : Promise<AddDoctorOutput>;
    updateDoctorOtp(userId:string):Promise<UpdateDoctor>
    getDoctorProfile(userId:string):Promise<GetDoctorProfile>
    updateDoctorProfile(formData:HospitalData,userId:string):Promise<GetDoctorProfile>
    changeProfile(userId:string,formData:ProfileFormData):Promise<GetDoctorProfile>
    changePassword(userId:string,newpassword:string,oldPassword:string):Promise<GetDoctorProfile>
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
    updateDoctorPassword(userId:string,password:string):Promise<SuccessResponse>
    createSlots(doctorId:string,slotData:any):Promise<SuccessResponse>
    getWalletHisotry(doctorId:string):Promise<Transaction>
    getSlots(doctorId:string):Promise<Slots>
    asignLeaveDays(doctorId:string,leaveDays:any):Promise<SuccessResponse>
    updateSlots(doctorId:string,slotData:any):Promise<SuccessResponse>
    blockSlots(doctorId:string,slotId:string):Promise<SuccessResponse>
    Appointments(doctorId:string):Promise<Appointments>
    getNotification(doctorId:string):Promise<Notification>
     
}
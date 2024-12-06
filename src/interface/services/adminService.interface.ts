
import { SuccessResponse, AdminOutputData, userData, doctorData, AppointmentData } from "./adminService.type";

export interface IAdminService{

    adminLogin(email:string,password:string):Promise<AdminOutputData>
    patientDetails(admin:string):Promise<userData|null>
    isBlocked(email:string,userId:string):Promise<SuccessResponse>
    isDelete(userId:string):Promise<SuccessResponse>
    isVerify(userId:string):Promise<SuccessResponse>
    doctorDetails(admin:string):Promise<doctorData|null>
    verifiedDoctors(admin:string):Promise<doctorData|null>
    doctorBlock(doctorId:string):Promise<SuccessResponse>
    deleteDoctor(doctorId:string):Promise<SuccessResponse>
    getAppoinments(admin:string):Promise<AppointmentData|null>
}
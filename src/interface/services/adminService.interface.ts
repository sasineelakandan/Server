
import { SuccessResponse, AdminOutputData, userData, doctorData } from "./adminService.type";

export interface IAdminService{

    adminLogin(email:string,password:string):Promise<AdminOutputData>
    patientDetails(admin:string):Promise<userData|null>
    isBlocked(email:string,userId:string):Promise<SuccessResponse>
    isDelete(userId:string):Promise<SuccessResponse>
    isVerify(userId:string):Promise<SuccessResponse>
    doctorDetails(admin:string):Promise<doctorData|null>
}
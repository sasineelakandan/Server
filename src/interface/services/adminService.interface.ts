
import { SuccessResponse, AdminOutputData, userData } from "./adminService.type";

export interface IAdminService{

    adminLogin(email:string,password:string):Promise<AdminOutputData>
    patientDetails(admin:string):Promise<userData|null>
    isBlocked(email:string,userId:string):Promise<SuccessResponse>
    isDelete(userId:string):Promise<SuccessResponse>
}
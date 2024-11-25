import { userData,SuccessResponse } from "./adminRepository.type";

export interface IAdminRepository{
    patientDetails(admin:string):Promise<userData|null>
    isBlocked(email:string,userId:string):Promise<SuccessResponse>
}
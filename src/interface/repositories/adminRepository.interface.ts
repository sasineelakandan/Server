import { userData,SuccessResponse, doctorData } from "./adminRepository.type";

export interface IAdminRepository{
    patientDetails(admin:string):Promise<userData|null>
    isBlocked(email:string,userId:string):Promise<SuccessResponse>
    isDelete(userId:string):Promise<SuccessResponse>
    isVerify(userId:string):Promise<SuccessResponse>
    doctorDetails(admin:string):Promise<doctorData|null>
    verifiedDoctors(admin:string):Promise<doctorData|null>
    doctorBlock(doctorId:string):Promise<SuccessResponse>
    deleteDoctor(doctorId:string):Promise<SuccessResponse>
    
}
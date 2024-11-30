import { doctorData, DoctorDetials } from "./bookingService.type";

export  interface IBookingService{
    getDoctors(userId:string):Promise<doctorData|null>
    doctorDetails(doctorId:string):Promise<DoctorDetials>
}
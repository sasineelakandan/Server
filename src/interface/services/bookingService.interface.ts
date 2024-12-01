import { doctorData, DoctorDetials, DoctorSlots } from "./bookingService.type";

export  interface IBookingService{
    getDoctors(userId:string):Promise<doctorData|null>
    doctorDetails(doctorId:string):Promise<DoctorDetials>
    getSlots(doctorId:string):Promise<DoctorSlots>
}
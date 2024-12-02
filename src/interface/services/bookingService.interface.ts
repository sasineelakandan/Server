import { doctorData, DoctorDetials, DoctorSlots, SelectedSlots, SuccessResponse } from "./bookingService.type";

export  interface IBookingService{
    getDoctors(userId:string):Promise<doctorData|null>
    doctorDetails(doctorId:string):Promise<DoctorDetials>
    getSlots(doctorId:string):Promise<DoctorSlots>
    bookingSlots(userId:string,doctorId:string,selectedSlots:SelectedSlots):Promise<SuccessResponse>

}
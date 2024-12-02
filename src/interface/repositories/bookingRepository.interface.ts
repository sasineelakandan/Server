import { doctorData, DoctorDetials, SlotData,SelectedSlots,SuccessResponse } from "./bookingRepository.type";

export interface IBookingRepository{
    getDoctors(userId:string):Promise<doctorData|null>
    doctorDetails(doctorId:string):Promise<DoctorDetials>
    getSlots(doctorId:string):Promise<SlotData>
    bookingSlots(userId:string,doctorId:string,selectedSlots:SelectedSlots):Promise<SuccessResponse>
}
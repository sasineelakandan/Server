import { doctorData, DoctorDetials, SlotData } from "./bookingRepository.type";

export interface IBookingRepository{
    getDoctors(userId:string):Promise<doctorData|null>
    doctorDetails(doctorId:string):Promise<DoctorDetials>
    getSlots(doctorId:string):Promise<SlotData>
}
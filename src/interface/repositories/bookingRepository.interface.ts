import { doctorData, DoctorDetials } from "./bookingRepository.type";

export interface IBookingRepository{
    getDoctors(userId:string):Promise<doctorData|null>
    doctorDetails(doctorId:string):Promise<DoctorDetials>
}
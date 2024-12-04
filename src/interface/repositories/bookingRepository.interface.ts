
import { doctorData, DoctorDetials, SlotData,SelectedSlots,SuccessResponse, Patient, OutPutPatient, IPayment, ConfirmData } from "./bookingRepository.type";

export interface IBookingRepository{
    getDoctors(userId:string):Promise<doctorData|null>
    doctorDetails(doctorId:string):Promise<DoctorDetials>
    getSlots(doctorId:string):Promise<SlotData>
    bookingSlots(userId:string,doctorId:string,selectedSlots:SelectedSlots):Promise<SuccessResponse>
    patientDetails(userId:string,patientDetails:Patient):Promise<OutPutPatient>
    paymentDetails(userId:string,PaymentData:IPayment):Promise<SuccessResponse>
    paymentSuccess(userId:string,txnid:string):Promise<SuccessResponse>
}
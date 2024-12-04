import { doctorData, DoctorDetials, DoctorSlots, Patient, SelectedSlots, SuccessResponse ,OutPutPatient, IPayment, ConfirmData} from "./bookingService.type";

export  interface IBookingService{
    getDoctors(userId:string):Promise<doctorData|null>
    doctorDetails(doctorId:string):Promise<DoctorDetials>
    getSlots(doctorId:string):Promise<DoctorSlots>
    bookingSlots(userId:string,doctorId:string,selectedSlots:SelectedSlots):Promise<SuccessResponse>
    patientDetails(userId:string,patientDetails:Patient):Promise<OutPutPatient>
    paymentDetails(userId:string,PaymentData:IPayment):Promise<SuccessResponse>
    paymentSuccess(userId:string,txnid:string):Promise<SuccessResponse>
}
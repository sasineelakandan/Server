import { CustomRequest } from "../../midlewere/jwt/authentiCateToken";
import { ControllerResponse } from "./userController.types";


export interface IBookingController{
  getDoctors(httpRequest:CustomRequest):Promise<ControllerResponse>
  doctorDetails(httpRequest:CustomRequest):Promise<ControllerResponse>
  getSlots(httpRequest:CustomRequest):Promise<ControllerResponse>
  bookingSlots(httpRequest:CustomRequest):Promise<ControllerResponse>
  patientDetails(httpRequest:CustomRequest):Promise<ControllerResponse>
  paymentDetails(httpRequest:CustomRequest):Promise<ControllerResponse>
  PaymentSucess(httpRequest:CustomRequest):Promise<ControllerResponse>
  
}
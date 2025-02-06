import { CustomRequest } from "../../middlewere/jwt/authentiCateToken";
import { ControllerResponse } from "./adminController.type";

export interface IAdminController{

 adminLogin(httpRequest:Request):Promise<ControllerResponse>
  patientDetails(httpRequest:CustomRequest):Promise<ControllerResponse>
  isBlocked(httpRequest:CustomRequest):Promise<ControllerResponse>
  isDelete(httpRequest:CustomRequest):Promise<ControllerResponse>
  isVerify(httpRequest:CustomRequest):Promise<ControllerResponse>
  doctorDetails(httpRequest:CustomRequest):Promise<ControllerResponse>
  verifiedDoctors(httpRequest:CustomRequest):Promise<ControllerResponse>
  blockDoctor(httpRequest:CustomRequest):Promise<ControllerResponse>
  deleteDoctor(httpRequest:CustomRequest):Promise<ControllerResponse>
  getAppointments(httpRequest:CustomRequest):Promise<ControllerResponse>
  getReviews(httpRequest:CustomRequest):Promise<ControllerResponse>
  deleteReview(httpRequest:CustomRequest):Promise<ControllerResponse>

}
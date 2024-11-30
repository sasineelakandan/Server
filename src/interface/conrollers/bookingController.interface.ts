import { CustomRequest } from "../../midlewere/jwt/authentiCateToken";
import { ControllerResponse } from "./userController.types";


export interface IBookingController{
  getDoctors(httpRequest:CustomRequest):Promise<ControllerResponse>
  doctorDetails(httpRequest:CustomRequest):Promise<ControllerResponse>
}
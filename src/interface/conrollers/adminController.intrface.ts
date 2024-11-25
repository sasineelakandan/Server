import { CustomRequest } from "../../midlewere/jwt/authentiCateToken";
import { ControllerResponse } from "./userController.types";

export interface IAdminController{

    adminLogin(httpRequest:Request):Promise<ControllerResponse>
    patientDetails(httpRequest:CustomRequest):Promise<ControllerResponse>
    isBlocked(httpRequest:CustomRequest):Promise<ControllerResponse>
    
}
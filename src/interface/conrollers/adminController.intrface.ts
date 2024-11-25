import { ControllerResponse } from "./userController.types";

export interface IAdminController{

    adminLogin(httpRequest:Request):Promise<ControllerResponse>
}
import { ControllerResponse } from "../conrollers/userController.types";
import { AdminInputData, AdminOutputData } from "./adminService.type";

export interface IAdminService{

    adminLogin(email:string,password:string):Promise<AdminOutputData>
}
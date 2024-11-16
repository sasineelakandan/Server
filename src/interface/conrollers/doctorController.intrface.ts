import { Request } from "express";
import {ControllerResponse} from '../conrollers/doctorController.types'


export interface IDoctorConroller{
    doctorSignup(httpRequest:Request):Promise<ControllerResponse>
    verifyOtp(httpRequest:Request): Promise<ControllerResponse>
    resendOtp(httpRequest:Request):Promise<ControllerResponse>
    doctorLogin(httpRequest:Request): Promise<ControllerResponse>; 
}
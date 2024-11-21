import { Request } from "express";
import {ControllerResponse} from '../conrollers/doctorController.types'
import { promises } from "fs";


export interface IDoctorConroller{
    doctorSignup(httpRequest:Request):Promise<ControllerResponse>
    verifyOtp(httpRequest:Request): Promise<ControllerResponse>
    resendOtp(httpRequest:Request):Promise<ControllerResponse>
    doctorLogin(httpRequest:Request): Promise<ControllerResponse>;
    doctorProfile(httpRequest:Request):Promise<ControllerResponse|undefined>
    verifyProfile(httpRequest:Request):Promise<ControllerResponse>
}
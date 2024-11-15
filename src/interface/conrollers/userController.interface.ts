import { Request } from "express";
import {ControllerResponse} from '../conrollers/userController.types'


export interface IUserConroller{
    userSignup(httpRequest:Request):Promise<ControllerResponse>
    verifyOtp(httpRequest:Request): Promise<ControllerResponse>
    resendOtp(httpRequest:Request):Promise<ControllerResponse>
    userLogin(httpRequest:Request): Promise<ControllerResponse>;
}
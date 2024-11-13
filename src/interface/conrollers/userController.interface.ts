import { Request } from "express";
import {ControllerResponse} from '../conrollers/userController.types'


export interface IUserConroller{
    userSignup(httpRequest:Request):Promise<ControllerResponse>
    
}
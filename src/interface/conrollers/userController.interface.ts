import { Request } from "express";
import {ControllerResponse} from '../conrollers/userController.types'


export interface IuserConroller{
    userSignup(httpRequest:Request):Promise<ControllerResponse>
}
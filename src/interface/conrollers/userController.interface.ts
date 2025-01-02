import { Request } from "express";
import {ControllerResponse} from '../conrollers/userController.types'


export interface IUserConroller{
    userSignup(httpRequest:Request):Promise<ControllerResponse>
    verifyOtp(httpRequest:Request): Promise<ControllerResponse>
    resendOtp(httpRequest:Request):Promise<ControllerResponse>
    userLogin(httpRequest:Request): Promise<ControllerResponse>;
    userProfile(httpRequest:Request):Promise<ControllerResponse>
    changeProfile(httpRequest:Request):Promise<ControllerResponse>
    changePassword(httpRequest:Request):Promise<ControllerResponse>
    getAppointments(httpRequest:Request):Promise<ControllerResponse>
    cancelAppointments(httpRequest:Request):Promise<ControllerResponse>
    updateProfilepic(httpRequest:Request):Promise<ControllerResponse>
    chatwithDoctor(httpRequest:Request):Promise<ControllerResponse>
    sendMessage(httpRequest:Request):Promise<ControllerResponse>
    getMessages(httpRequest:Request):Promise<ControllerResponse>
    getChatMembers(httpRequest:Request):Promise<ControllerResponse>
    slotAssign(httpRequest:Request):Promise<ControllerResponse>
    getcompleteAppointment(httpRequest:Request):Promise<ControllerResponse>
    userReview(httpRequest:Request):Promise<ControllerResponse>
    googleLogin(httpRequest:Request):Promise<ControllerResponse>
    getReview(httpRequest:Request):Promise<ControllerResponse>
    
}
import { Request } from "express";
import {ControllerResponse} from '../controller/doctorController.types'
import { promises } from "fs";


export interface IDoctorConroller{
    doctorSignup(httpRequest:Request):Promise<ControllerResponse>
    verifyOtp(httpRequest:Request): Promise<ControllerResponse>
    resendOtp(httpRequest:Request):Promise<ControllerResponse>
    doctorLogin(httpRequest:Request): Promise<ControllerResponse>;
    doctorProfile(httpRequest:Request):Promise<ControllerResponse|undefined>
    verifyProfile(httpRequest:Request):Promise<ControllerResponse>
    changeProfile(httpRequest:Request):Promise<ControllerResponse>
    changePassword(httpRequest:Request):Promise<ControllerResponse>
    forgotPasswordOtp(httpRequest:Request):Promise<ControllerResponse>
    getAppointments(httpRequest:Request):Promise<ControllerResponse>
    resheduleAppointment(httpRequest:Request):Promise<ControllerResponse>
    completeAppointment(httpRequest:Request):Promise<ControllerResponse>
    cancelAppointment(httpRequest:Request):Promise<ControllerResponse>
    updateProfilepic(httpRequest:Request):Promise<ControllerResponse>
    chatwithUser(httpRequest:Request):Promise<ControllerResponse>
    sendMessage(httpRequest:Request):Promise<ControllerResponse>
    getMessages(httpRequest:Request):Promise<ControllerResponse>
    getChatMembers(httpRequest:Request):Promise<ControllerResponse>
    forgotPassword(httpRequest:Request):Promise<ControllerResponse>
    createSlots(httpRequest:Request):Promise<ControllerResponse>
    getWalletHisotry(httpRequest:Request):Promise<ControllerResponse>
    getSlots(httpRequest:Request):Promise<ControllerResponse>
    asignLeaveDays(httpRequest:Request):Promise<ControllerResponse>
    updateSlots(httpRequest:Request):Promise<ControllerResponse>
    blockSlots(httpRequest:Request):Promise<ControllerResponse>
    Appointments(httpRequest:Request):Promise<ControllerResponse>
    getNotification(httpRequest:Request):Promise<ControllerResponse>
    addPriscription(httpRequest:Request):Promise<ControllerResponse>
    getPriscription(httpRequest:Request):Promise<ControllerResponse>
}
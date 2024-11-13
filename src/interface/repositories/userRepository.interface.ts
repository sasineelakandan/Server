import { promises } from 'dns'
import { AddUserInput, AddUserOuput,AddOtpInput,AddOtpOutput } from '../repositories/userRepository.types'

export interface IuserRepository{
    addUser(userData:AddUserInput):Promise<AddUserOuput>
    saveOtp(Otp:AddOtpInput):Promise<AddOtpOutput>
}
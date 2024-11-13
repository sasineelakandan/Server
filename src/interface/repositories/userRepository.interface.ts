
import { AddUserInput, AddUserOuput,AddOtpInput,AddOtpOutput, findOtp } from '../repositories/userRepository.types'

export interface IuserRepository{
    addUser(userData:AddUserInput):Promise<AddUserOuput>
    verifyOtp(userData:findOtp):Promise<AddOtpOutput>
}
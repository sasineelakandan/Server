
import { AddUserInput, AddUserOuput,GetUserOutput,AddOtpOutput, findOtp, updateUser } from '../repositories/userRepository.types'

export interface IuserRepository{
    addUser(userData:AddUserInput):Promise<AddUserOuput>
    verifyOtp(userData:findOtp):Promise<AddOtpOutput>
    getUserByEmail(email: string) : Promise<GetUserOutput>;
    updateUserOtp(userId:string):Promise<updateUser>
}
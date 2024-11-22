
import { AddUserInput, AddUserOuput,GetUserOutput,AddOtpOutput, findOtp, updateUser,GetuserProfileOutput } from '../repositories/userRepository.types'

export interface IuserRepository{
    addUser(userData:AddUserInput):Promise<AddUserOuput>
    verifyOtp(userData:findOtp):Promise<AddOtpOutput>
    getUserByEmail(email: string) : Promise<GetUserOutput>;
    updateUserOtp(userId:string):Promise<updateUser>
    userProfile(profilePic:string,userId:string):Promise<GetuserProfileOutput>
}
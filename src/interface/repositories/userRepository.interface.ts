
import { AddUserInput, AddUserOuput,GetUserOutput,AddOtpOutput, findOtp, updateUser,GetuserProfileOutput, Appointments ,SuccessResponse} from '../repositories/userRepository.types'

export interface IuserRepository{
    addUser(userData:AddUserInput):Promise<AddUserOuput>
    verifyOtp(userData:findOtp):Promise<AddOtpOutput>
    getUserByEmail(email: string) : Promise<GetUserOutput>;
    updateUserOtp(userId:string):Promise<updateUser>
    userProfile(userId:string):Promise<GetuserProfileOutput>
    changeProfile(userId: string,name:string,phone:number):Promise<GetuserProfileOutput>
    changePassword(userId:string,newpassword:string,oldPassword:string):Promise<GetuserProfileOutput>
    getAppointments(userId:string):Promise<Appointments>
    cancelAppointments(userId:string,appointmentId:string):Promise<SuccessResponse>
    updateProfilePic(userId:string,profilePic:string):Promise<SuccessResponse>
}
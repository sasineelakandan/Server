
import { AddUserInput, AddUserOuput,GetUserOutput,AddOtpOutput, findOtp, updateUser,GetuserProfileOutput, Appointments ,SuccessResponse, Messages,ChatMembers, AppointmentSlot, AppointmentSlotOutput, ReviewData, ReviewOutput, GoogleUser, GoogleUserOutput, ReviewDatas} from '../repositories/userRepository.types'

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
    chatwithDoctor(userId:string,appointmentId:string):Promise<SuccessResponse>
    sendMessage(roomId:string,message:string):Promise<SuccessResponse>
    getMessage(roomId:string):Promise<Messages>
    getChatMembers(userId:string):Promise<ChatMembers>
    slotAsign(userId:string,slotData:AppointmentSlot):Promise<AppointmentSlotOutput>
    getcompleteAppointment(userId:string):Promise<Appointments>
    userReview(userId:string,Review:ReviewData):Promise<ReviewOutput>
    googleLogin(GoogleUser:GoogleUser):Promise<GoogleUserOutput>
    getReview(doctorId:string):Promise<ReviewDatas>
}
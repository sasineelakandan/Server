import { UserSignupInput, UserSignupOutput,OtpInput,OtpOutput, findOtp } from "./userService.types";

export interface IUserService {
  userSignup(userData: UserSignupInput): Promise<UserSignupOutput>;
  verifyOtp(otpData:findOtp): Promise<OtpOutput>

}
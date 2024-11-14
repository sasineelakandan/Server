import { UserSignupInput, UserSignupOutput,OtpOutput, findOtp } from "./userService.types";

export interface IUserService {
  userSignup(userData: UserSignupInput): Promise<UserSignupOutput>;
  verifyOtp(otpData:findOtp): Promise<OtpOutput>
  userLogin(email: string, password: string): Promise<UserSignupOutput>;

}
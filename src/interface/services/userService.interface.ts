import { UserSignupInput, UserSignupOutput,OtpInput,OtpOutput } from "./userService.types";

export interface IUserService {
  userSignup(userData: UserSignupInput): Promise<UserSignupOutput>;
  saveOtp(otpData:OtpInput ): Promise<OtpOutput>;

}
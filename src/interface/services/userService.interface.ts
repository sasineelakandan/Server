import { UserSignupInput, UserSignupOutput,OtpInput,OtpOutput } from "./userService.types";

export interface IUserService {
  userSignup(userData: UserSignupInput): Promise<UserSignupOutput>;


}
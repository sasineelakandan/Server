import { UserSignupInput, UserSignupOutput } from "./userService.types";

export interface IUserService {
  userSignup(userData: UserSignupInput): Promise<UserSignupOutput>;


}
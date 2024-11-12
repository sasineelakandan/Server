import { Request } from "express";
import {IUserConroller} from '../interface/conrollers/userController.interface'
import { IUserService } from "../interface/services/userService.interface";
import {ControllerResponse} from '../interface/conrollers/userController.types'



export class UserController implements IUserConroller {
    private userService: IUserService;
  
    constructor(userService: IUserService) {
      this.userService = userService;
    }
  
    userSignup = async (httpRequest: Request): Promise<ControllerResponse> => {
      try {
        const { username, email, phone, password, age, address, gender } =
          httpRequest.body;
  
        const user = await this.userService.userSignup({
          username,
          email,
          phone,
          password,
          age,
          address,
          gender,
        });
        const { accessToken, refreshToken } = user;
  
        return {
          headers: {
            "Content-Type": "application/json",
          },
          statusCode: 201,
          body: user,
          accessToken,
          refreshToken,
        };
      } catch (e: any) {
        console.log(e);
        return {
          headers: {
            "Content-Type": "application/json",
          },
          statusCode: e.statusCode || 500,
          body: {
            error: e.message,
          },
        };
      }
    };
}
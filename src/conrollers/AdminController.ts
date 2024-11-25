import { IAdminController } from "../interface/conrollers/adminController.intrface";
import { ControllerResponse } from "../interface/conrollers/userController.types";
import { IAdminService } from "../interface/services/adminService.interface";
import { CustomRequest } from "../midlewere/jwt/authentiCateToken";


export class AdminController implements IAdminController {
    private adminService: IAdminService;

    constructor(adminService: IAdminService) {
        this.adminService = adminService;
    }

    adminLogin = async (httpRequest: Request): Promise<ControllerResponse> => {
        try {

            const {email,password}:any=httpRequest.body
            const admin = await this.adminService.adminLogin(email, password);
            console.log(admin)
            if (admin.admin==false) {
                return {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    statusCode: 401,
                    body: {
                        error: "Invalid email or password",
                    },
                };
            }

            const { accessToken, refreshToken } = admin;

            
            return {
                headers: {
                    "Content-Type": "application/json",
                },
                statusCode: 200,
                body: { ...admin, accessToken, refreshToken },
            };
        } catch (e: any) {
            console.error("Error in adminLogin:", e);

            return {
                headers: {
                    "Content-Type": "application/json",
                },
                statusCode: e.statusCode || 500,
                body: {
                    error: e.message || "An unexpected error occurred",
                },
            };
        }
    };
}
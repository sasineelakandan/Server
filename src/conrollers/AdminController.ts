import { IAdminController } from "../interface/conrollers/adminController.intrface";
import { ControllerResponse } from "../interface/conrollers/userController.types";
import { IAdminService } from "../interface/services/adminService.interface";
import { CustomRequest } from "../midlewere/jwt/authentiCateToken";


export class AdminController implements IAdminController {
    private adminService: IAdminService;

    constructor(adminService:IAdminService ) {
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

   patientDetails=async(httpRequest:CustomRequest): Promise<ControllerResponse>=> {
       try{
           
          const admin=httpRequest?.user?.id
          
        if (!admin) {
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

        const users=await this.adminService.patientDetails(admin)

        
        return {
            headers: {
                "Content-Type": "application/json",
            },
            statusCode: 200,
            body: users
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
   }
   isBlocked=async(httpRequest: CustomRequest): Promise<ControllerResponse>=> {
       try{
         const email=httpRequest?.user?.id
         const {userId}=httpRequest?.body
         console.log(email,userId)
         if(!email){
            throw new Error("Email is required but was not provided.");
         }
        const user=await this.adminService.isBlocked(email,userId)

        return {
            headers: {
                "Content-Type": "application/json",
            },
            statusCode: 200,
            body: user
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
   }
   isDelete=async(httpRequest: CustomRequest): Promise<ControllerResponse>=> {
    try{
        
        const {userId}=httpRequest?.query
        console.log(userId)
        if (!userId || typeof userId !== 'string') {
            throw new Error("userId is required and must be a string.");
          }
       const user=await this.adminService.isDelete(userId)

       return {
           headers: {
               "Content-Type": "application/json",
           },
           statusCode: 200,
           body: user
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
   }
   isVerify=async(httpRequest: CustomRequest): Promise<ControllerResponse>=> {
    try{
        
        const {userId}=httpRequest?.body
        console.log(userId)
        if (!userId || typeof userId !== 'string') {
            throw new Error("userId is required and must be a string.");
          }
       const doctor=await this.adminService.isVerify(userId)

       return {
           headers: {
               "Content-Type": "application/json",
           },
           statusCode: 200,
           body: doctor
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
   }
   doctorDetails=async(httpRequest: CustomRequest): Promise<ControllerResponse> =>{
    try{
          
        const admin=httpRequest?.user?.id
         
      if (!admin) {
          return {
              headers: {
                  "Content-Type": "application/json",
              },
              statusCode: 401,
              body: {
                  error: "Invalid authentication",
              },
          };
      }

      const doctors=await this.adminService.doctorDetails(admin)

      console.log(doctors)
      return {
          headers: {
              "Content-Type": "application/json",
          },
          statusCode: 200,
          body: doctors
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
   }
   verifiedDoctors=async(httpRequest: CustomRequest): Promise<ControllerResponse> =>{
    try{
          
        const admin=httpRequest?.user?.id
         
      if (!admin) {
          return {
              headers: {
                  "Content-Type": "application/json",
              },
              statusCode: 401,
              body: {
                  error: "Invalid authentication",
              },
          };
      }

      const doctors=await this.adminService.verifiedDoctors(admin)

      
      return {
          headers: {
              "Content-Type": "application/json",
          },
          statusCode: 200,
          body: doctors
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
   }

   blockDoctor=async(httpRequest: CustomRequest): Promise<ControllerResponse> =>{
    try{
          
    const {doctorId}=httpRequest?.body
         
      if (!doctorId) {
          return {
              headers: {
                  "Content-Type": "application/json",
              },
              statusCode: 401,
              body: {
                  error: "Doctor Id is missing",
              },
          };
      }

      const doctors=await this.adminService.doctorBlock(doctorId)

      
      return {
          headers: {
              "Content-Type": "application/json",
          },
          statusCode: 200,
          body: doctors
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

       
   
}
deleteDoctor=async(httpRequest: CustomRequest): Promise<ControllerResponse>=> {
    try{
        
        const {doctorId}=httpRequest?.query
        console.log(doctorId)
        if (!doctorId || typeof doctorId !== 'string') {
            throw new Error("userId is required and must be a string.");
          }
       const user=await this.adminService.deleteDoctor(doctorId)

       return {
           headers: {
               "Content-Type": "application/json",
           },
           statusCode: 200,
           body: user
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
   }
   getAppointments=async(httpRequest: CustomRequest): Promise<ControllerResponse> =>{
    try{
        
        const admin=httpRequest.user?.id
        
        if (!admin || typeof admin !== 'string') {
            throw new Error("userId is required and must be a string.");
          }
       const appointments=await this.adminService.getAppoinments(admin)

       return {
           headers: {
               "Content-Type": "application/json",
           },
           statusCode: 200,
           body: appointments
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
   }
}


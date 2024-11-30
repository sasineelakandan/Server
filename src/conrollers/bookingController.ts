import { error } from "console";
import { IBookingController } from "../interface/conrollers/bookingController.interface";
import { ControllerResponse } from "../interface/conrollers/userController.types";
import { IBookingService } from "../interface/services/bookingService.interface";
import { CustomRequest } from "../midlewere/jwt/authentiCateToken";



export class BookingController implements IBookingController{
  private bookingService:IBookingService

  constructor(bookingService:IBookingService){
    this.bookingService=bookingService
  }

  getDoctors=async(httpRequest:CustomRequest): Promise<ControllerResponse>=> {
      
    try {
        
        const userId=httpRequest?.user?.id
        if(!userId){
            throw error('userId not found')
        }
        const doctors = await this.bookingService.getDoctors(userId);
        
        return {
            headers: {
                "Content-Type": "application/json",
            },
            statusCode: 200,
            body: doctors ,
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

doctorDetails=async(httpRequest: CustomRequest): Promise<ControllerResponse> =>{
    try {
        
        const userId=httpRequest?.user?.id
        const {doctorId}=httpRequest?.body
        if(!userId){
            throw error('userId not found')
        }
        const doctor= await this.bookingService.doctorDetails(doctorId);
        
        return {
            headers: {
                "Content-Type": "application/json",
            },
            statusCode: 200,
            body: doctor,
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
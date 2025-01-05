import { error } from "console";
import { IBookingController } from "../Interface/controller/bookingController.interface";
import { ControllerResponse } from "../Interface/controller/bookingController.type";
import { IBookingService } from "../Interface/Service/bookingService.interface";
import { CustomRequest } from "../middlewere/jwt/authentiCateToken";



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
getSlots=async(httpRequest: CustomRequest): Promise<ControllerResponse>=> {
    try {
        
        const userId=httpRequest?.user?.id
        const {doctorId}=httpRequest?.body
        if(!userId){
            throw error('userId not found')
        }
        if(!doctorId){
            throw error('doctorId not found')
        }
        const slots= await this.bookingService.getSlots(doctorId,userId);
        
        return {
            headers: {
                "Content-Type": "application/json",
            },
            statusCode: 200,
            body: slots,
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
bookingSlots=async(httpRequest: CustomRequest): Promise<ControllerResponse> =>{
    try {
        const userId=httpRequest?.user?.id
        if(!userId){
            throw error('user unauthorized')
        }
        const {doctorId,selectedSlot}=httpRequest?.body
       console.log(selectedSlot)
        if(!doctorId){
            throw error('doctorId not found')
        }
        const slotStatus= await this.bookingService.bookingSlots(userId,doctorId,selectedSlot);
        
        return {
            headers: {
                "Content-Type": "application/json",
            },
            statusCode: 200,
            body: slotStatus,
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
patientDetails=async(httpRequest: CustomRequest): Promise<ControllerResponse> =>{
    try {
        const userId=httpRequest?.user?.id
        const patientDetails=httpRequest?.body
        if(!userId){
            throw error('user unauthorized')
        }
        
       
        const Patient= await this.bookingService.patientDetails(userId,patientDetails);
        
        return {
            headers: {
                "Content-Type": "application/json",
            },
            statusCode: 200,
            body: Patient,
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
paymentDetails=async(httpRequest: CustomRequest): Promise<ControllerResponse> =>{
    try {
        const userId=httpRequest?.user?.id
        const paymentDetails=httpRequest?.body
        if(!userId){
            throw error('user unauthorized')
        }
        
       
        const payment= await this.bookingService.paymentDetails(userId,paymentDetails);
        
        return {
            headers: {
                "Content-Type": "application/json",
            },
            statusCode: 200,
            body: payment,
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

PaymentSucess=async(httpRequest: CustomRequest): Promise<ControllerResponse> =>{
    try {
         
        const {productinfo}=httpRequest?.body
        const {txnid}=httpRequest?.body
        
       
        
       
        const payment= await this.bookingService.paymentSuccess(productinfo,txnid);
        
        return {
            headers: {
                "Content-Type": "application/json",
            },
            statusCode: 200,
            body: payment,
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
import { error } from "console";
import { IBookingRepository } from "../interface/repositories/bookingRepository.interface";
import { IBookingService } from "../interface/services/bookingService.interface";
import { doctorData, DoctorDetials, DoctorSlots, SelectedSlots, SuccessResponse } from "../interface/services/bookingService.type";

export class BookingService implements IBookingService {
  private bookingRepository: IBookingRepository;

  constructor(bookingRepository: IBookingRepository) {
    this.bookingRepository = bookingRepository;
  }

  getDoctors = async (userId: string): Promise<doctorData | null> => {
    try {
      if (!userId) {
        return null;
      }
      const doctors = await this.bookingRepository.getDoctors(userId);

      if (!doctors) {
        return null;
      }

      return doctors;
    } catch (error: any) {
      console.log("Error in userLogin", error.message);
      throw new Error(error.message);
    }
  };
  doctorDetails=async(doctorId: string): Promise<DoctorDetials>=> {
    try {
      
      const doctor = await this.bookingRepository.doctorDetails(doctorId);
        if(!doctor){
          throw error('doctor not found')
        }
      return {...doctor}
    } catch (error: any) {
      console.log("Error in doctor details", error.message);
      throw new Error(error.message);
    }
  };
  getSlots=async(doctorId: string): Promise<DoctorSlots> =>{
    try {
      
      const slots = await this.bookingRepository.getSlots(doctorId);
        if(!slots){
          throw error('doctor not found')
        }
      return slots
    } catch (error: any) {
      console.log("Error in doctor slots", error.message);
      throw new Error(error.message);
    }
  }

  bookingSlots=async(userId:string,doctorId: string, selectedSlots: SelectedSlots): Promise<SuccessResponse>=> {
    try {
      
      const slots = await this.bookingRepository.bookingSlots(userId,doctorId,selectedSlots);
        if(!slots){
          throw error('response is failed')
        }
      return slots
    } catch (error: any) {
      console.log("Error in doctor slots", error.message);
      throw new Error(error.message);
    }
  }
  }


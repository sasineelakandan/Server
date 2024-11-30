import { error } from "console";
import { IBookingRepository } from "../interface/repositories/bookingRepository.interface";
import { IBookingService } from "../interface/services/bookingService.interface";
import { doctorData, DoctorDetials } from "../interface/services/bookingService.type";

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
  }

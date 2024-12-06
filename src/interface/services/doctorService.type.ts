export type DoctorSignupInput = {
    name: string;
    email: string;
    phone: string;
    password: string;
    specialization: string;
    experience: number;
    profilePic?: string;
    licensePic?: string;
  };
  
  export type DoctorSignupOutput = {
    readonly _id: string;
    readonly name: string;
    readonly email: string;
    readonly phone: string;
    readonly specialization: string;
    readonly experience: number;
    
    readonly profilePic?: string;
    readonly licensePic?: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    readonly accessToken: string;
    readonly refreshToken: string;
  };
  
  export type DoctorOtpInput = {
    doctorId: string;         
    generatedOtp: string;         
  };
  
  export type DoctorOtpOutput = {
    readonly _id: string;           
    readonly doctorId: string;        
    readonly otp: string;            
    readonly expiryDate: Date;     
  };
  
  export type FindDoctorOtp = {
    userId: string;
    otp: string;
  };
  
  export type ResendDoctorOtp = {
    message: string;
  };
  

  export type DoctorFormData= {
    hospitalName: string;
    licenseNumber: string;
    street: string;
    city: string;
    state: string;
    licenseImage: string;
    fees: number;
    profilePic:string;
    userId:string
  }

  export type DoctorProfileOutput = {
    readonly _id: string;
    readonly name: string;
    readonly email: string;
    readonly phone: string;
    readonly state:string;
    readonly street:string;
    readonly city:string;
    readonly password: string;
    readonly specialization: string;
    readonly licenseNumber:string,
    readonly hospitalName:string;
    readonly fees:string;
    readonly isVerified:boolean;
    readonly experience: string;
    readonly profilePic?: string;
    readonly licenseImage?: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
   
  };

  export type FormData ={
    hospitalName: string;
    licenseNumber: string;
    street: string;
    city: string;
    state: string;
    licenseImage: string;
    licenseImage1: string;
    fees: number;
  }

  export type ProfileFormData= {
    name: string;
    phone: string;
    hospitalName: string;
    fees: number;
    street: string;
    city: string;
    state: string;
    experience: number;
  }

  export type DoctorSlotRequest= {
    doctorId: string;
    date: string;
    startTime: string; 
    endTime: string; 
  }

  export type SuccessResponse ={
    status: string;       
    message: string;      
                 
  }
  export type Appointments= Array<{ [key: string]: any }>

  export type ResheduleData={
    appointmentId:string
    date:string,
    startTime:string
    endTime:string
  }
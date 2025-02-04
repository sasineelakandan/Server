export type AddDoctorInput = {
    name: string;
    email: string;
    phone: string;
    password: string;
    specialization: string;
    experience: number;
    profilePic?: string;
    licensePic?: string;
    location:any
  };
  
  export type AddDoctorOutput = {
    readonly _id: string;
    readonly name: string;
    readonly email: string;
    readonly phone: string;
    readonly password: string;
    readonly specialization: string;
    readonly experience: number;
    readonly profilePic?: string;
    readonly licensePic?: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
  };
  
  export type GetDoctorOutput = {
    readonly _id: string;
    readonly name: string;
    readonly email: string;
    readonly phone: string;
    readonly password: string;
    readonly specialization: string;
    readonly experience: number;
    readonly profilePic?: string;
    readonly licensePic?: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
  };
  
  export type AddDoctorOtpInput = {
    doctorId: string;
    generatedOtp: string;
  };
  
  export type AddDoctorOtpOutput = {
    readonly _id: string;
    readonly doctorId: string;
    readonly otp: string;
    readonly expiryDate: Date;
  };
  
  export type GetDoctorOtpOutput = {
    readonly _id: string;
    readonly doctorId: string;
    readonly otp: string;
    readonly expiryDate: Date;
    readonly generatedDate: Date;
    readonly createdAt: Date;
    readonly updatedAt: Date;
  };
  
  export type FindDoctorOtp = {
    userId: string;
  };
  
  export type UpdateDoctor = {
    message: string;
  };
  
  export type AddFormData= {
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
  export type GetDoctorProfile= {
    readonly _id: string;
    readonly name: string;
    readonly email: string;
    readonly phone: string;
    readonly location:any
    readonly password: string;
    readonly specialization: string;
    readonly licenseNumber:string,
    readonly hospitalName:string;
    readonly fees:string;
    readonly isVerified:boolean
    readonly experience: string;
    readonly profilePic?: string;
    readonly licenseImage?: string;
    readonly eWallet:number
    readonly createdAt: Date;
    readonly updatedAt: Date;
  };

  export type HospitalData ={
    hospitalName: string;
    licenseNumber: string;
   
    fees: number;
  }

  export type ProfileFormData= {
    name: string;
    phone: string;
    hospitalName: string;
    fees: number;
    location:any
    experience: number;
  }


  export type DoctorSlotRequest= {
    
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

  export type Messages= Array<{ [key: string]: any }>
  export type ChatMembers= Array<{ [key: string]: any }>
  export type Transaction= Array<{ [key: string]: any }>
  export type Slots= Array<{ [key: string]: any }>
  export type Notification= Array<{ [key: string]: any }>
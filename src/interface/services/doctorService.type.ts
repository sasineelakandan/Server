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
  
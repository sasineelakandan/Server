export type AddDoctorInput = {
    name: string;
    email: string;
    phone: string;
    password: string;
    specialization: string;
    experience: number;
    profilePic?: string;
    licensePic?: string;
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
    readonly state:string;
    readonly street:string;
    readonly city:string;
    readonly password: string;
    readonly specialization: string;
    readonly licenseNumber:string,
    readonly hospitalName:string;
    readonly fees:string;
    readonly experience: string;
    readonly profilePic?: string;
    readonly licenseImage?: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
  };

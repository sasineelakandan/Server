export type doctorData=Array<{ [key: string]: any }>


export type DoctorDetials = {
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

  export type DoctorSlots= Array<{ [key: string]: any }>
   
  export type SelectedSlots=string[]

  export type SuccessResponse={
    status:string,
    success:boolean,
    message:string
  }
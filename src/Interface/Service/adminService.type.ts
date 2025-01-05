export type AdminInputData={
    email:string,
    password:string
}

export type AdminOutputData={

    readonly admin:boolean
    readonly accessToken?: string;
    readonly refreshToken?: string;
}

export type userData=Array<{ [key: string]: any }>
export type doctorData=Array<{ [key: string]: any }>
export type AppointmentData=Array<{ [key: string]: any }>
export type SuccessResponse = {
    success: boolean;
    message?: string; 
  };

  export type ReviewDatas= Array<{ [key: string]: any }>
export type UserSignupInput = {
  username: string;
  email: string;
  phone: string;
  password: string;
 
};

export type UserSignupOutput = {
  readonly _id: string;
  readonly username: string;
  readonly email: string;
  readonly phone: string;
  
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly accessToken: string;
  readonly refreshToken: string;
};
export type UserProfileOutput = {
  readonly _id: string;
  readonly username: string;
  readonly email: string;
  readonly phone: string;
  readonly profilePic?:string
 readonly   eWallet:number,
  readonly createdAt: Date;
  readonly updatedAt: Date;
 
};


export type OtpInput = {
  userId: string;         
  generatedOtp:string         
   
}
export type Appointments= Array<{ [key: string]: any }>



export type OtpOutput = {
readonly _id: string;           
readonly userId: string;        
readonly otp: string;            
readonly expiryDate: Date;     
      
};

export type findOtp={
userId: string;
otp:string 
}


export type resendOtp={
message:string
}

export type SuccessResponse ={
status: string;       
message: string;      
             
}

export type Messages= Array<{ [key: string]: any }>
export type ChatMembers= Array<{ [key: string]: any }>

export type AppointmentSlot= {
date: string; 
doctorId: string; 
startTime: string;
endTime: string; 
isBooked: boolean; 
}
export type AppointmentSlotOutput= {
_id:string;
date: string; 
doctorId: string; 
startTime: string;
endTime: string; 
isBooked: boolean; 
}

export type ReviewData ={

doctorId: string;

rating: number; 
comment: string;

}

export type ReviewOutput ={
 

rating: number; 
reviewText: string;
createdAt:string

}

export type GoogleUser= {
displayName: string;
email: string;
photoURL: string;


}

export type GoogleUserOutput= {
readonly _id:string
readonly username: string;
readonly email: string;

readonly profilePic?:string


readonly accessToken?: string;
readonly refreshToken?: string;

}

export type ReviewDatas= Array<{ [key: string]: any }>
export type SlotDatas= Array<{ [key: string]: any }>
export type Transaction= Array<{ [key: string]: any }>
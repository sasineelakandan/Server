
export type AddUserInput = {
  username: string;
  email: string;
  phone: string;
  password: string;
  
};

export type AddUserOuput = {
  readonly _id: string;
  readonly username: string;
  readonly email: string;
  readonly phone: string;
  
  readonly createdAt: Date;
  readonly updatedAt: Date;
};

export type GetUserOutput = {
  readonly _id: string;
  readonly username: string;
  readonly email: string;
  readonly phone: string;
  readonly password: string;
  
  readonly createdAt: Date;
  readonly updatedAt: Date;
};
export type AddOtpInput = {
  userId: string;         
  generatedOtp:string          
     
};

export type AddOtpOutput = {
  readonly _id: string;           
  readonly userId: string;        
  readonly otp: string;           
  readonly expiryDate: Date;      
     
       
};

export type GetOtpOutput = {
  readonly _id: string;          
  readonly userId: string;       
  readonly otp: string;           
  readonly expiryDate: Date;      
  readonly generatedDate: Date;   
  readonly createdAt: Date;       
  readonly updatedAt: Date;     
};

export type findOtp={
userId: string;

}

export type updateUser={
message:string
}

export type GetuserProfileOutput = {
 _id: string;
 username: string;
 email: string;
 phone: string;
 password: string;
 profilePic: string
 createdAt: Date;
 updatedAt: Date;
};

export type Appointments= Array<{ [key: string]: any }>

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
appointmentId:string; 
rating: number; 
reviewText: string;

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
phone: string;

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
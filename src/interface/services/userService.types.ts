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
    readonly profilePic:string
    readonly createdAt: Date;
    readonly updatedAt: Date;
   
  };

  export type OtpInput = {
    userId: string;         
    generatedOtp:string         
     
}



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

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
  readonly _id: string;
  readonly username: string;
  readonly email: string;
  readonly phone: string;
  readonly password: string;
  readonly  profilePic?: string|null
  readonly createdAt: Date;
  readonly updatedAt: Date;
};

export type Appointments= Array<{ [key: string]: any }>
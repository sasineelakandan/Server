export type doctorData=Array<{ [key: string]: any }>

export type DoctorDetials = {
    readonly _id: string;
    readonly name: string;
    readonly email: string;
    readonly phone: string;
    readonly location:any;
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

  export type SlotData=Array<{ [key: string]: any }>


  export type SelectedSlots=string[]

  export type SuccessResponse={
    status:string
    success:boolean,
    message:string
  }

  export type  Patient ={
    firstName: string; 
    lastName: string; 
    doctorId: string;  
    slotId: string;    
    reason: string;    
    terms: boolean;    
      age: number;     
      gender:string;   
        
    };

    export type OutPutPatient={
      _id:string
      firstName: string; 
    lastName: string; 
    doctorId: string;  
    slotId: string;    
    reason: string;    
    userId:string;   
      age: number;     
      gender:string;

    }

    export  type  IPayment= {
      slotId: string
      doctorId: string
      patientId:string 
    
      amount:string;
      
      txnid: string;  
    }

    export  type  ConfirmData= {
    
      
      txnid: string;  
    }
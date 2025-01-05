export interface SendOtpEmailOptions {
    email: string;      
    otp: string;        
    subject?: string;   
    text?: string;      
    html?: string;      
}
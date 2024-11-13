import nodemailer from "nodemailer";
import { SendOtpEmailOptions } from "../../interface/midlewere/sendOtpEmailtypes";


const transpoter=  nodemailer.createTransport({
    service:'gmail',
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth:{
        user:process.env.USER_EMAIL,
        pass:process.env.USER_PASS
    }
})


export const sendOtpEmail = async (options: SendOtpEmailOptions): Promise<boolean> => {
    const { email,otp,text,html,subject } = options;
     console.log(otp)
    const mailOptions = {
        from: `"Docreserva" <${process.env.USER_EMAIL}>`,
        to: email,
        subject,
        text: text || `Your OTP code is: ${otp}`,
        html: html || `<p>Your OTP code is: <b>${otp}</b></p>`,
    };

    try {
        await transpoter.sendMail(mailOptions);
        console.log(`OTP sent successfully to ${email}`);
        return true;
    } catch (error) {
        console.error("Error sending OTP email:", error);
        return false;
    }
};

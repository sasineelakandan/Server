import nodemailer from "nodemailer";
const transpoter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASS
    }
});
export const sendOtpEmail = async (options) => {
    const { email, otp, text, html, subject } = options;
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
    }
    catch (error) {
        console.error("Error sending OTP email:", error);
        return false;
    }
};

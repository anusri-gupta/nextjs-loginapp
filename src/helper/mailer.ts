import { connect } from "@/dbConfig/dbConfig";
import  User  from "@/model/userModel";
import nodemailer from "nodemailer"
import bcryptjs from "bcryptjs"
connect()
export const sendEmail = async ({email,emailType,userId}:any) => {
    
    try {
        //TODO:configure mailer for usage
        const hashedToken = await bcryptjs.hash(userId.toString(),10)
        if(emailType=='VARIFY'){
             await User.findByIdAndUpdate( userId, {
                $set:{varifyToken:hashedToken,  varifyTokenExpiry:Date.now() + 3600000}})
        }else{
             await User.findByIdAndUpdate( userId, 
                {$set:{forgotPasswordToken:hashedToken,  forgotPasswordTokenExpiry:Date.now() + 3600000}})
        }
        
        /* const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: "maddison53@ethereal.email",
            pass: "jn7jnAPss4f63QBp6D",
        },
        }); */
        // Looking to send emails in production? Check out our Email API/SMTP product!
        var transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "1e463e146ab4e7",//must be in env
            pass: "5642fee6f51f40" //must be in env
        }
        });

        const mailOption ={
            from: 'contact@ayanonline.com',
            to: email,
            subject: emailType==='VARIFY'?"Verify Email":"Reset Password",
            //text: "Hello world?", // plain‑text body
            html: `<p>click <a href="${process.env.DOMAIN}verifyemail?token=${hashedToken}">here</a>to ${emailType=="VARIFY"?"varify your password" : "reset your password"} or copy paste the link below inyour browser <br>${process.env.DOMAIN}verifyemail?token=${hashedToken}</p>`, // HTML body
        }
         const info = await transporter.sendMail(mailOption);
    } catch (error:any) {
        throw new Error(error.message)
    }
}
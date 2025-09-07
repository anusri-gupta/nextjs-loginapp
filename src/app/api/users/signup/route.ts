import { connect } from "@/dbConfig/dbConfig";
import  User  from "@/model/userModel";
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from "bcryptjs"
import {sendEmail} from "@/helper/mailer"

connect()

export async function POST(request:NextRequest) {
    try {
         const reqBody = await request.json()
         const {username,email,password} = reqBody
        //TODO:validation
        const user = await User.findOne({email})

        if(user){
            return NextResponse.json({error:"User already exists"},{status:400})
        }else{
            const salt = await bcryptjs.genSalt(10)
            const hashedPassword = await bcryptjs.hash(password,salt)
            const newUser = new User({
                username:username,
                email:email,
                password:hashedPassword
            })

            const savedUser= await newUser.save()
            console.log(savedUser)
            const sendmail = await sendEmail({email,emailType:'VARIFY',userId:savedUser._id})
            return NextResponse.json({
                message:"User registerd successfully",
                status:true,
                savedUser

            })
        }
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }
   

}
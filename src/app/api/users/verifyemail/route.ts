import { connect } from "@/dbConfig/dbConfig";
import  User  from "@/model/userModel";
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from "bcryptjs"
import {sendEmail} from "@/helper/mailer"
import { time } from "console";

connect()

export async function POST(request:NextRequest){
    try {
        const reqBody =  await request.json()
        const {token}=reqBody
        console.log(token)
        const user = await User.findOne({varifyToken:token,varifyTokenExpiry:{$gt:Date.now()}})
       
        if(!user){
            return NextResponse.json({error:"Invalid Token"},{status:400})
        }
         console.log(user._id);
        user.isVerified=true
        user.varifyToken=undefined
        user.varifyTokenExpiry=undefined
        
        try {
            const savedUser  = await user.save()
             console.log('saved user')
        } catch (error:any) {
            console.log('last error is ',error.message)
        }
       
        return NextResponse.json({message:"User Verified",success:true},{status:200})
    } catch (error:any) {
        console.log(3)
        return NextResponse.json({error:error.message},{status:500})
    }
}
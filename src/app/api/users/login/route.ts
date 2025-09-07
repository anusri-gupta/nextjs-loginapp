import { connect } from "@/dbConfig/dbConfig";
import  User  from "@/model/userModel";
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect()

export async function POST(request:NextRequest) {
    try {
        console.log("user 1")
         const reqBody = await request.json()
         const {email,password} = reqBody

        const user = await User.findOne({email})
        if(!user){
              return NextResponse.json({error:"User Does not exists"},{status:400})
        }
        console.log('user id is',user._id)
        const verifiedpassword = await bcryptjs.compare(password,user.password)
        if(!verifiedpassword){
             return NextResponse.json({error:"check you credentials"},{status:400})
        }
        console.log("user loggedin")
        const jwtPayload = {
            id:user._id,
            email:user.email,
            username:user.username
        }
        const token = await jwt.sign(jwtPayload,process.env.TOKEN_SECRET!,{expiresIn:"1d"})
        const response = NextResponse.json({message:"User loggedin successfully",success:true},{status:200})
        response.cookies.set("token",token,{httpOnly:true})
            
            return response

    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }
   

}
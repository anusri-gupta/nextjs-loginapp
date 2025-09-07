import { NextRequest,NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import  User  from "@/model/userModel";
import {getTokenVerified} from "@/helper/getTokenVerified"

connect()

export async function POST(request:NextRequest) {
    const id = await getTokenVerified(request)

    const user = await User.findOne({_id:id}).select("-password")

    if(!user){
        return NextResponse.json({message:"No user Found",success:false},{status:400})
    }
      return NextResponse.json({message:"user Found",data:user},{status:200})
}
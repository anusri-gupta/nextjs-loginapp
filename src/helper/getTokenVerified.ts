import {NextRequest} from "next/server"
import jwt from "jsonwebtoken"

export const getTokenVerified = (request:NextRequest)=>{
    try {
        const token = request.cookies.get("token")?.value || ""
        const verifiedtoken:any = jwt.verify(token,process.env.TOKEN_SECRET!)
        return verifiedtoken.id
    } catch (error:any) {
        throw new Error(error.message)
        
    }
}
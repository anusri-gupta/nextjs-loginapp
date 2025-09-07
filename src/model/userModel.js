import mongoose from "mongoose"; // ✅ Use ES Module import

const { Schema, model, models } = mongoose;


const userSchema = new Schema({
    username: {
        type:String,
        required:[true,"Please provide a username"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"Please provide password"]
    },
    email:{
        type:String,
        required:[true,"Please provile email"],
        unique:true
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    forgotPasswordToken:String,
    forgotPasswordTokenExpiry:Date,
    varifyToken:String,
    varifyTokenExpiry:Date
})

const User = mongoose.models.users || mongoose.model("users",userSchema)

export default User
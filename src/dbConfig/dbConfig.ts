import mongoose from "mongoose";

export async function connect(){
    try{
        mongoose.connect(process.env.MONGO_URL!)
        const connection = mongoose.connection
        connection.on("connected",()=>{
            console.log("Mongo DB connected Successfully")
        });
        connection.on("error",(err)=>{
            console.log("coonection failed to MongoDB "+ err)
            process.exit()
        })
    }catch(error){
        console.log("Can not connect to DB");
        console.log(error);
    }
}
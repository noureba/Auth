import mongoose from "mongoose";

const connectMongodb = async () => {

    mongoose.connection.on("connected",()=>{
        console.log("db connected")
    })

    await mongoose.connect(`${process.env.MONGODB_URI}/auth`)

};

export default connectMongodb;

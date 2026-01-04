import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

export const connectDB = async(): Promise<void> => {
    try{
        await mongoose.connect(process.env.MONGO_URL || "");
        console.log('mongoDB is connected');
    }catch(err){
        console.error('mongoConnection Failed');
        process.exit(1);
    }
}
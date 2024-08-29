import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async() => {
    try {
        await mongoose.connect(`${process.env.MONGO_DB_URL}/${DB_NAME}`);
        console.log("\n Connected to MongoDB!!!!");
    } catch (error) {
        console.log("Error while connecting database", error);
        throw new error;
    }
}

export default connectDB;
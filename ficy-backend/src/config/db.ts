import mongoose from "mongoose";
import { fetchAndDumpDataFromApi } from "../import/ice-and-fire.import";

const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI as string);
    console.log(`MongoDB connected: ${conn.connection.host}`);
    await fetchAndDumpDataFromApi();
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};

export default connectDB;

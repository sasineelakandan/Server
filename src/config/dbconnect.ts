import mongoose from "mongoose";
import { MONGO_URI } from "../utils/constant";

export async function connectDb (): Promise<void> {
  try {
    await mongoose.connect(MONGO_URI());
    console.log("MongoDB Atlas connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}
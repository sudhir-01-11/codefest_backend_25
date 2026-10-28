import mongoose from "mongoose";
import { mongoUri } from "./constants.js";

export const connectDB = async () => {
  if (!mongoUri) {
    throw new Error("MongoDB URI is not configured");
  }

  const connection = await mongoose.connect(mongoUri, { dbName: "codefest" });
  console.log(`Database connected with ${connection.connection.host}`);
};

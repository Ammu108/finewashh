import mongoose from "mongoose";
import "dotenv/config";

export const connectDB = async () => {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("DATABASE_URL is not set in the environment");
  }

  await mongoose.connect(databaseUrl).then(() => console.log("DB Connected"));
};

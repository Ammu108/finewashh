import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect("mongodb+srv://amenx:amenx000@cluster0.edc8w.mongodb.net/hospital")
    .then(() => console.log("DB Connected"));
};

import cors from "cors";
import express from "express";
import "dotenv/config";
import connectCloudinary from "./config/cloudinary";
import { connectDB } from "./config/db.js";
import adminRouter from "./routes/adminRoute.js";
import appointmentRouter from "./routes/appointmentRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import userRouter from "./routes/userRoute.js";

// app config
const app = express();
const port = process.env.PORT || 4000;

// DB Connection
connectDB();
connectCloudinary();

// middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true })); // Important for FormData

// api endpoints
app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/appointment", appointmentRouter);

app.get("/", (_req, res) => {
  res.send("API Working");
});

app.listen(port, () => {
  console.log(`Server Started On http://localhost:${port}`);
});

import express from "express"
import { adminDashboard, adminLogin, allAppointments, allDoctors, cancelAppointment, completedAppointment, confirmAppointment, deleteAppointment, getAppointment } from "../controllers/adminController.js";
import { addDoctor } from "../controllers/doctorController.js";
import upload from "../middleware/multer.js";
import authAdminMiddleware from "../middleware/authAdmin.js";

const adminRouter = express.Router();

adminRouter.post("/login", adminLogin);
adminRouter.post("/add-doctor", upload.single('image'), addDoctor);
adminRouter.post("/all-doctors", authAdminMiddleware, allDoctors);
adminRouter.post("/all-appointments", authAdminMiddleware, allAppointments);
adminRouter.post("/appointment-cancel", authAdminMiddleware, cancelAppointment);

adminRouter.get("/getappointment/:id",  getAppointment);
adminRouter.get("/dashboard",  authAdminMiddleware, adminDashboard);

adminRouter.put("/confirm-appointment/:id", upload.single('image'), confirmAppointment);

adminRouter.post("/appointment-completed", authAdminMiddleware, completedAppointment);

adminRouter.delete("/delete-appointment", deleteAppointment);

export default adminRouter;
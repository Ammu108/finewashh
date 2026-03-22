import express from 'express';
import {bookingDetails, listAppointment, cancelledAppointment, getAppointment, updateAppointment} from '../controllers/appointmentController.js';
import authMiddleware from '../middleware/authUser.js';

const appointmentRouter = express.Router();

appointmentRouter.post("/bookappointment", authMiddleware, bookingDetails);
appointmentRouter.get("/yourappointment", authMiddleware, listAppointment);
appointmentRouter.post("/cancel-appointment", authMiddleware, cancelledAppointment);

appointmentRouter.get("/getappointment/:id",  getAppointment);
appointmentRouter.put("/updateAppointment/:id",  updateAppointment);

export default appointmentRouter; 
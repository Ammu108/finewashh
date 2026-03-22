import express from 'express'
import { deleteDoctor, doctorDetails, doctorList, loginDoctor } from '../controllers/doctorController.js'

const doctorRouter = express.Router()

doctorRouter.post("/login", loginDoctor)
doctorRouter.get('/list', doctorList)
doctorRouter.get('/doctor-details/:id', doctorDetails)

doctorRouter.delete("/delete-doctor/:id", deleteDoctor);

export default doctorRouter
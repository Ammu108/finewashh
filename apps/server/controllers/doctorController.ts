import bcrypt from "bcryptjs";
import { v2 as cloudinary } from "cloudinary";
import jwt from "jsonwebtoken";
import doctorModel from "../models/doctorModel.js";

// Controller to Add a New Doctor
const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      phoneNumber,
      about,
      address,
      date,
    } = req.body;
    const imageFile = req.file;

    // Validate Required Fields
    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !degree ||
      !experience ||
      !phoneNumber ||
      !about ||
      !address ||
      !date
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Check if Doctor Already Exists
    const existingDoctor = await doctorModel.findOne({ email });
    if (existingDoctor) {
      return res.status(400).json({ message: "Doctor with this email already exists." });
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // upload image to cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    const imageUrl = imageUpload.secure_url;

    // Create New Doctor
    const newDoctor = new doctorModel({
      name,
      email,
      image: imageUrl,
      password: hashedPassword,
      speciality,
      degree,
      experience,
      phoneNumber,
      about,
      address,
      date,
    });

    // Save Doctor to Database
    await newDoctor.save();
    res.status(201).json({ message: "Doctor added successfully!", doctor: newDoctor });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// display doctors

const doctorList = async (_req, res) => {
  try {
    const doctors = await doctorModel.find({}).select(["-password"]);
    res.json({ success: true, doctors });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get particular doctor details

const doctorDetails = async (req, res) => {
  try {
    const id = req.params.id;
    const doctorExist = await doctorModel.findById(id);
    if (!doctorExist) {
      return res.status(404).json({ message: "Doctor Not Found" });
    }
    res.status(200).json(doctorExist);
  } catch (_error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// API to delete the particular doctor

const deleteDoctor = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteDoctor = await doctorModel.findByIdAndDelete(id);

    if (!deleteDoctor) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, message: "User deleted successfully" });
  } catch (_error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// API to login the doctor

const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;
    const doctor = await doctorModel.findOne({ email });

    if (!doctor) {
      return res.json({ success: false, message: "Invalid Credentailals" });
    }

    const isMatch = await bcrypt.compare(password, doctor.password);

    if (isMatch) {
      const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid Credentials" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export { addDoctor, doctorList, doctorDetails, loginDoctor, deleteDoctor };

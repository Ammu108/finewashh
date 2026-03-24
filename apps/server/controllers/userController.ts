import bcrypt from "bcryptjs";
import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import validator from "validator";
import userModel from "../models/userModel.js";

// login User
const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User Doesn't Exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid Credentials." });
    }

    const token = createToken(user._id);
    res.json({
      success: true,
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        picture: user.picture,
      },
    });
  } catch (error) {
    console.log(error);
    res.json({ succes: false, message: "Error" });
  }
};

// creatre token
const createToken = (id: string) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// Register User
const registerUser = async (req: Request, res: Response) => {
  const { name, password, email } = req.body;
  try {
    // checking is user already exists
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "user already exists" });
    }

    // validating email format & strong password
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "please enter a valid email" });
    }

    if (password.length < 8) {
      return res.json({ success: false, message: "please enter a strong password" });
    }

    // hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name: name,
      email: email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    const token = createToken(user._id);
    res.json({
      success: true,
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        picture: user.picture,
      },
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// API to get all users data at dashboard

const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const allUsers = await userModel.find({});
    res.json({ success: true, allUsers });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// API to delete the user

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;

    const deletedAppointment = await userModel.findByIdAndDelete(id);

    if (!deletedAppointment) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting appointment:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export { loginUser, registerUser, getAllUsers, deleteUser };

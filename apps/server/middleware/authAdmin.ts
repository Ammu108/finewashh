import jwt from "jsonwebtoken";
import "dotenv/config";
import type { NextFunction, Request, Response } from "express";

const authAdminMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { atoken } = req.headers;

    if (!atoken || typeof atoken !== "string") {
      return res
        .status(401)
        .json({ success: false, message: "Access Denied. No token provided." });
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }

    const decoded = jwt.verify(atoken, process.env.JWT_SECRET);

    if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) {
      throw new Error("Admin credentials are not defined in environment variables");
    }

    if (decoded !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      return res.json({ success: false, message: "Not Authorized, Login Again" });
    }

    next();
  } catch (_error) {
    return res.status(400).json({ success: false, message: "Invalid Token" });
  }
};

export default authAdminMiddleware;

import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.headers;

  if (!token || typeof token !== "string") {
    return res
      .status(401)
      .json({ success: false, message: "Access Denied. No token provided." });
  }

  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Type guard to ensure decoded is an object with id
    if (typeof decoded === "object" && decoded !== null && "id" in decoded) {
      req.user = { id: String(decoded.id) };
      next();
    } else {
      return res.status(400).json({ success: false, message: "Invalid Token" });
    }
  } catch (_error) {
    return res.status(400).json({ success: false, message: "Invalid Token" });
  }
};

export default authMiddleware;

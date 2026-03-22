import jwt from "jsonwebtoken"


const authMiddleware = (req, res, next) => {
    const {token} = req.headers;

    if (!token) {
        return res.status(401).json({ success: false, message: "Access Denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Now req.user contains { id: user._id }
        next();
    } catch (error) {
        return res.status(400).json({ success: false, message: "Invalid Token" });
    }
};

export default authMiddleware;

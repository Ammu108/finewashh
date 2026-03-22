import jwt from "jsonwebtoken"

const authAdminMiddleware = (req, res, next) => {

    try {

        const { atoken } = req.headers;

        if (!atoken) {
            return res.status(401).json({ success: false, message: "Access Denied. No token provided." });
        }

        const decoded = jwt.verify(atoken, process.env.JWT_SECRET);
        req.user = decoded;

        if(decoded !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
            return res.json({success:false,message:"Not Authorized, Login Again"});
        }

        next();
        
    } catch (error) {
        return res.status(400).json({ success: false, message: "Invalid Token" });
    }

};

export default authAdminMiddleware;
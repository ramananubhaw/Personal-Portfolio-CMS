import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
    if (!req.cookies || !req.cookies.access_token) {
        if (req.path === "/logout") {
            res.status(401).json({message: "Logged out already."});
        }
        else {
            res.status(401).json({message: "Token expired."});
        }
        return;
    }
    const token = req.cookies.access_token;
    jwt.verify(token, process.env.SECRET_ACCESS_TOKEN, (error, decoded) => {
        if (error){
            res.status(401).json({message: "Authorization failed."});
            return;
        }
        req.admin = decoded;
        next();
    });
};
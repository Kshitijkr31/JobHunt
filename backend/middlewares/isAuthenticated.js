import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies?.token;
        if (!token) {
            return res.status(401).json({
                message: "Authentication required. Please login.",
                success: false,
            });
        }

        const decode = jwt.verify(token, process.env.SECRET_KEY);
        if (!decode) {
            return res.status(403).json({
                message: "Invalid token. Please login again.",
                success: false,
            });
        }

        req.id = decode.userId;
        next(); // Pass control to the next middleware or route
    } catch (error) {
        console.error("Error in isAuthenticated middleware:", error);
        return res.status(500).json({
            message: "Authentication error. Please try again later.",
            success: false,
        });
    }
};

export default isAuthenticated;

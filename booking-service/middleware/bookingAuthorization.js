import jwt from "jsonwebtoken"; 


export const verifyTokenBooking = async (req, res, next) => {
    try {
        
        if (!req.cookies) {
            return res.status(401).json({ message: 'No cookies found' });
        }
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ message: 'No token found' });
        }
        
        // console.log('Headers:', req.headers);
        // console.log('Cookies:', req.cookies);
        // console.log('token:', token);

        if (!token) {
            console.log("No token found in cookiess");
            return res.status(401).json({ status: "Error", message: "Unauthorized: Token not provided" });
        }

        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        //console.log("Token decoded:", decoded);
        req.user = decoded;

        next();
        
    } catch (error) {
        console.error("Error verifying the token:", error);
        
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ message: 'Invalid TOKEN: ' + error.message });
        } else if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ message: 'Token expiraded' });
        } else {
            return res.status(500).json({ message: 'Error interno del servidor al verificar el token' });
        }
    }
};
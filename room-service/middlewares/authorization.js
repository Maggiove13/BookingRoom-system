import jwt from "jsonwebtoken"; 


export const verifyToken = async (req, res, next) => {
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
            console.log("No se encontró token en las cookies");
            return res.status(401).json({ status: "Error", message: "No autorizado: Token no proporcionado" });
        }

        // Intentar verificar el token con la clave secreta
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        console.log("Token decodificado:", decoded);

        // Si el token es válido, guardar el usuario en la request y continuar
        req.user = decoded;

        // Continuar con la siguiente función middleware
        next();
        
    } catch (error) {
        console.error("Error al verificar el token:", error);
        
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ message: 'Token inválido: ' + error.message });
        } else if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ message: 'Token expirado' });
        } else {
            return res.status(500).json({ message: 'Error interno del servidor al verificar el token' });
        }
    }
};
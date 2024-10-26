//Este es el controlador de autenticacion

import pool from "../connection-db.js";  
import bcryptjs from "bcryptjs"; 
import jwt from "jsonwebtoken";
import dotenv from "dotenv";


dotenv.config();

async function login(req, res) {
    console.log(req.body);
    const { user, password } = req.body; 

    if (!user || !password) {
        console.log("fields cannot be empty")
        return res.status(400).send({status: "Error", message: "incomplete fields"});
    }

    try {
        const result = await pool.query('SELECT * FROM users WHERE user_name = $1', [user]);

        if (result.rows.length === 0) {
            return res.status(404).send({ status: "Error", message: "the user doesn´t exists" });
        }

        const userData = result.rows[0];
        
        const correctLogin = await bcryptjs.compare(password, userData.password);

        if (!correctLogin) {
            return res.status(401).send({ status: "Error", message: "incorrect password" });
        }

        // Si el login es correcto, vamos a generar un token:
        // Generar el token JWT
        console.log("JWT_SECRET:", process.env.JWT_SECRET); 
        console.log("JWT_EXPIRATION:", process.env.JWT_EXPIRATION);  

        const token = jwt.sign(
            { user: userData.user_name },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRATION }
        );

        console.log("Token enviado:", token); 


        const cookieOption = {
            expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000), // Expiración de la cookie
            httpOnly: true, 
            path: "/"
        };

        res.cookie("jwt", token, cookieOption);

        res.status(200).send({
            message: "User Logged",
            redirect: "/admin"
        });

    } catch (error) {
        console.error('Error trying to log in', error);
        res.status(500).send({ status: "Error", message: "Error trying to log in" });
    };
}


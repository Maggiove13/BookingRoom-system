import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
import { pool } from '../models/connection-db.js';

dotenv.config();

async function cookieReview(req) {
    const cookieJWT = req.cookies.jwt
    if (!cookieJWT) {
        return false; 
    }
    console.log("token:", cookieJWT);

    try {
        const decode = jwt.verify(cookieJWT, process.env.JWT_SECRET);
        console.log("this is the decode:", decode); 

        const userId = decode.user_id; 
        const result = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
        if (result.rows.length === 0) {
            return false; 
        }
        const user = result.rows[0];
        return user.role === "admin"; 
    } catch (error) {
        console.error("Error verifying token:", error);
        return false; 
    }
}

async function onlyAdmin(req, res, next) {
    const logged = await cookieReview(req); 
    if (logged) {
        return next();
    }

    return res.redirect("/");
}


async function onlyPublic(req, res, next) {
    const logged = await cookieReview(req);
    if (!logged) {
        return next();
    }

    return res.redirect("/admin");
}


export const methods = {
    onlyAdmin,
    onlyPublic
}

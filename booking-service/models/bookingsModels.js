import { dbConfig } from "../config/config.js";
import pg from "pg";

const { Pool } = pg;


const pool = new Pool({
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database,
    port: dbConfig.port
});


if (!pool){
    console.log("There was an error connecting to the database", pool.name);
    console.error("There was an error:", error)
} else {
    console.log("Connected to de database");
}


export const queryInsertBooking = async (user_id, room_id, start_date, end_date, status) => {
    try {
        return await pool.query('INSERT INTO bookings (user_id, room_id, start_date, end_date, status) VALUES ($1, $2, $3, $4, $5) RETURNING *', [user_id, room_id, start_date, end_date, status]);
    } catch (error) {
        console.log(error);
        throw  error;
    } 
}
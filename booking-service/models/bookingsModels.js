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


export const queryGetAllBookingsByUserId = async (user_id) => {
    try{
        const consult = await pool.query('SELECT * FROM bookings WHERE user_id = $1', [user_id]);
        return consult;
    } catch (error){
        console.log("Error in queryGetAllBookingsByUserId: ", error);
        throw error;
    } 
}


export const queryDeleteBookingFromUser = async (user_id, room_id) => {
    try{
        const queryDelete = await pool.query('DELETE FROM bookings WHERE user_id = $1 AND room_id = $2', [user_id, room_id]);
        return queryDelete;
    } catch (error) {
        console.error("Error in queryDeleteBookingFromUser:", error);
        throw error;
    }
}


export const queryUpdateBookingStatus = async (room_id, status) => {
    try{
        const query = await pool.query('UPDATE bookings SET status = $1 WHERE id = $2', [status, room_id]);
        return query;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
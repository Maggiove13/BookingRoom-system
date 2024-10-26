import { dbConfig } from "../config/config.js";
import pg from "pg";

const { Pool } = pg;

export const pool = new Pool({
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database,
    port: dbConfig.port
});

try {
    await pool.connect(); 
    console.log("Connected to the database");
} catch (error) {
    console.log("There was an error connecting to the database");
    console.error("Error details:", error);
}

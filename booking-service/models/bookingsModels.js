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
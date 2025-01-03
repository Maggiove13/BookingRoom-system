import dotenv from "dotenv";

dotenv.config();


export const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE_NAME,
    port: process.env.DB_PORT
}
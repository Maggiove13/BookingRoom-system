import dotenv from "dotenv";

dotenv.config();

//Exportar el objeto que contiene la configuracion de los datos de la base de datos
export const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
}
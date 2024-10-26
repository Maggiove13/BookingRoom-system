import { databaseConfig } from "../config/config.js";
import pg from "pg";  // Usando pg para la conexión a PostgreSQL


const { Pool } = pg;

const pool = new Pool({
    host: databaseConfig.host,
    user: databaseConfig.user,
    password: databaseConfig.password,
    database: databaseConfig.name,
    port: databaseConfig.port
});


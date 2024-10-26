import express from "express";
import dotenv from "dotenv";
import { roomsRoutes } from "./routes/roomRoutes.js";
import cookieParser from "cookie-parser"; //npm install 'cookie-parser'

dotenv.config();

const app = express();

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server runnig at port ${PORT}`);
});

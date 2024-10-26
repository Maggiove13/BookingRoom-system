import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { bookingRoutes } from "./routes/bookingRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use(cookieParser());



const port = process.env.PORT;

app.listen(port, (error) => {
    if (error){
        console.log("Error starting the server", error);
    }
    console.log(`Server running at port ${port}`);
});
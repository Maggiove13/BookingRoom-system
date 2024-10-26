import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { bookingRoutes } from "./routes/bookingRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());
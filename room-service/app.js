import express from "express";
import dotenv from "dotenv";
import { roomsRoutes } from "./routes/roomRoutes.js";
import cookieParser from "cookie-parser"; //npm install 'cookie-parser'

dotenv.config();
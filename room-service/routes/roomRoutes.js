import { Router } from "express";
import { addRoom } from "../controllers/roomControllers.js"; 
import { availableRoom } from "../controllers/roomControllers.js"; 
import { verifyToken } from "../middleware/authorization.js"; 
import { UpdateStatusRoom } from "../controllers/roomControllers.js";


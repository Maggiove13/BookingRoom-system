import { Router } from "express";
import { addRoom } from "../controllers/roomControllers.js"; 
import { availableRoom } from "../controllers/roomControllers.js"; 
import { verifyToken } from "../middleware/authorization.js"; 
import { UpdateStatusRoom } from "../controllers/roomControllers.js";

const router = Router();

router.post("/add", addRoom);

router.get("/availableRoom/", verifyToken, availableRoom);

router.put("/updateRooms/",  UpdateStatusRoom);

export const roomsRoutes = router;
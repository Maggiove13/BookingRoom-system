import { Router } from "express";
import { makeBooking } from "../controllers/bookingControllers.js";
import { deleteBooking } from "../controllers/bookingControllers.js";
import { getAllBooksByUser } from "../controllers/bookingControllers.js";
import { updateBooking } from "../controllers/bookingControllers.js";
import { verifyTokenBooking } from "../middleware/bookingAuthorization.js";


const router = Router();


router.post("/makeABooking", verifyTokenBooking, makeBooking);

router.delete("/deleteBookings",verifyTokenBooking, deleteBooking);

router.get("/allBookings",verifyTokenBooking, getAllBooksByUser);

router.put("/updateBookings", updateBooking);


export const bookingRoutes = router;
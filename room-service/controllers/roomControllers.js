import { queryAddRoom } from "../models/roomModel.js"; //Funcion de Models
import { queryAvailableRoom } from "../models/roomModel.js"; //Funcion de Models
import { queryUpdateStatusRoom } from "../models/roomModel.js";
import amqp from "amqplib";


export const addRoom = async (req, res) => {
    const {type, capacity, status} = req.body;
    try {
        await queryAddRoom(type, capacity, status);
        res.status(200).send({message: "Room added successfully"});
    } catch (error) {
        res.status(500).send({message: "Internal server error"});
    }
}

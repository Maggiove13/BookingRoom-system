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


export const availableRoom = async (req, res) => {
    try{
        const responseAvailableRooms = await queryAvailableRoom();
        if (responseAvailableRooms.length > 0){ 
            console.log("Rooms are available: ", responseAvailableRooms);
            res.status(200).send({message: "There are available rooms", responseAvailableRooms});
        } else {
            console.log("Not available rooms");
            res.status(404).send({message: "Not available rooms"});
        }
    }catch (error){ 
        res.status(500).send({message: "Error retrieving info about a room"});
        console.log("Error.", error);
    }
} 


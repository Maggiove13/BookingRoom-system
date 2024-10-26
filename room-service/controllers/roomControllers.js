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


export const UpdateStatusRoom = async (req, res) => {
    const {room_id, status} = req.body;

    try{
        const validStatus = ['available', 'not available'];
        if (!validStatus.includes(status)){
            return res.status(400).send({message: "Invalid status. Status must be: 'available' or 'not available'"});
        };

        const resultQ = await queryUpdateStatusRoom(status, room_id);
        console.log(resultQ);

        if (resultQ.rowCount === 0){
            console.error(error);
            return res.status(404).send({message: "room_id not found"});
        }
        return res.status(200).send({message: "Rooms status updated"});

    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Internal server error" });
    }
}
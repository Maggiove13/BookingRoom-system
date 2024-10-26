import { queryInsertBooking } from "../models/bookingsModels.js";
import { queryGetAllBookingsByUserId } from "../models/bookingsModels.js";
import { queryDeleteBookingFromUser } from "../models/bookingsModels.js";
import { queryUpdateBookingStatus } from "../models/bookingsModels.js";
import amqp from "amqplib";
import CircuitBreaker from 'opossum';
import axios from "axios";


export const makeBooking = async (req, res) => {

    const {user_name, room_id, start_date, end_date} = req.body;

    const status = "pending"; 

    try {
        const loginUrl = `http://localhost:4000/api/login/${user_name}`;
        const userResponse = await axios.get(loginUrl);
        const user_id = userResponse.data.user_id;
        const result = await queryInsertBooking(user_id, room_id, start_date, end_date, status);

        if (result.rowCount === 0){
            return res.status(400).send({message: "Error: Booking not created"});
        }

        const booking = result.rows[0]; // Obtener la primera fila de la respuesta

        console.log("Booking result:", booking);

        // Enviar el room_id y el status del room a la RabbitMQ

        const roomAvailability = 'not available'; // Una vez que haces la reserva, el room queda reservado.

        // Usar el Circuit Breaker para enviar el mensaje
        breaker.fire(roomAvailability, booking.room_id).catch((error) => {
            console.error("Error al enviar el mensaje:", error);
        })


        res.status(200).send({message: "Booking Successful"});

    } catch (error){
        console.error("Error, creating a booking", error);
        res.status(500).send({message: "Error creating the booking"});
    }
}


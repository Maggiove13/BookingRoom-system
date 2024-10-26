import { queryInsertBooking } from "../models/bookingsModels.js";
import { queryGetAllBookingsByUserId } from "../models/bookingsModels.js";
import { queryDeleteBookingFromUser } from "../models/bookingsModels.js";
import { queryUpdateBookingStatus } from "../models/bookingsModels.js";
import amqp from "amqplib";
import CircuitBreaker from 'opossum';
import axios from "axios";
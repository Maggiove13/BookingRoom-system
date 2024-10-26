//Este es el controlador de autenticacion

import pool from "../connection-db.js";  
import bcryptjs from "bcryptjs"; 
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

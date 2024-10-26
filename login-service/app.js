import express from "express";
import dotenv from "dotenv";
import path from 'path';
import { fileURLToPath } from "url";
import cookieParser from 'cookie-parser';

dotenv.config();

// Fix para __dirname
const __dirname = path.dirname(fileURLToPath(import.meta.url));

//Server
const app = express(); 

// Configuraciones para los archivos estaticos, osea para las decoraciones
//app.use(express.static(__dirname + "public"));
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para procesar JSON | Expres -no viene configurado para leer json, asi que para qque pueda leer, hacemos esto:
app.use(express.json());

// Middleware para parsear cookies
app.use(cookieParser()); 






const port = process.env.LOGIN_PORT; 
app.listen(port, (error) => {
    if (error){
        console.log("Error starting the server", error);
    }
    console.log(`Server running at port ${port}`);
});


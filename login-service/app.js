import express from "express";
import dotenv from "dotenv";
import path from 'path';
import { fileURLToPath } from "url";
import cookieParser from 'cookie-parser';
import { methods as authentication } from "./loginControllers/authentication.controller.js";
import { methods as authorization } from "./middlewares/authorization.js";


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


// Ruta principal - HOME
app.get("/", authorization.onlyPublic, (req, resp) => {
    resp.sendFile(path.join(__dirname, "pages", "login.html")); // Ruta con path.join para evitar problemas de compatibilidad
});


// Ruta para mandarle al usuario para visualiacion del register.
app.get("/register",authorization.onlyPublic, (req, resp) => {
    resp.sendFile(path.join(__dirname, "pages", "register.html")); // Ruta con path.join para evitar problemas de compatibilidad
});


// Ruta para la pagina de admin
app.get("/admin", authorization.onlyAdmin, (req, resp) => {
    resp.sendFile(path.join(__dirname, "pages", "admin", "admin.html")); // Ruta con path.join para evitar problemas de compatibilidad
});


// Ruta para la api Login - Obtener datos del usuario
app.post("/api/login", authentication.login);

// Ruta para la api Register - Obtener datos del usuario
app.post("/api/register", authentication.register);

// Endpoint en el microservicio Login para obtener el user_id por nombre
app.get('/api/login/:name', authentication.getUserName);



const port = process.env.LOGIN_PORT; 
app.listen(port, (error) => {
    if (error){
        console.log("Error starting the server", error);
    }
    console.log(`Server running at port ${port}`);
});


import express from "express";
import dotenv from "dotenv";

dotenv.config();


//Server
const app = express(); 
const port = process.env.LOGIN_PORT; 
app.listen(port, (error) => {
    if (error){
        console.log("Error starting the server", error);
    }
    console.log(`Server running at port ${port}`);
});


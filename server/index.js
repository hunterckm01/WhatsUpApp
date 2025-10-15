// ES6 WAP TO EXPORT
import express from 'express';
import 'dotenv/config'
import dbConnection from './config/database.js';
import cors from 'cors'
import cloudinaryConnection from './config/cloudinary.js';
import cookieParser from 'cookie-parser';
import multer from 'multer';


// MAKING CHAT APP
const chatApp = express();
const PORT =  process.env.PORT || 4001;

// MIDDLEWARES
chatApp.use(express.json());

//DATABASE CONNECTION
dbConnection();
// CLOUDINARY CONNECTION
cloudinaryConnection();
// DEFAULT ROUTE
chatApp.get('/', (req, res)=>{
    return res.json({
        success: true,
        message: "Pick Picker Backend Started"
    })
})
// FOR PARSING THE COOKIES: COOKIES ARE USED TO INTERACT WITH THE BROWSER TO GET THE INCOMING REQUESTS FROM BROWSERS
chatApp.use(cookieParser());

//CORS:
chatApp.use(
    cors({
        origin: process.env.FRONTEND_URL,
        credentials: true
    })
)

// FILE UPLOAD


// ES6 WAP TO EXPORT
import express from 'express';
import 'dotenv/config'
import dbConnection from './config/database.js';
import cors from 'cors'
import cloudinaryConnection from './config/cloudinary.js';
import cookieParser from 'cookie-parser';
import multer from 'multer';
import {fileURLToPath} from 'node:url'
import { dirname, join } from "node:path";
import { Server } from 'socket.io';
import { createServer } from 'node:http';


// MAKING CHAT APP
const chatApp = express();
const server = createServer(chatApp);
const PORT =  process.env.PORT || 4001;

// MIDDLEWARES
chatApp.use(express.json());
// FOR PARSING THE COOKIES: COOKIES ARE USED TO INTERACT WITH THE BROWSER TO GET THE INCOMING REQUESTS FROM BROWSERS
chatApp.use(cookieParser());

//DATABASE CONNECTION
dbConnection();

// CLOUDINARY CONNECTION
cloudinaryConnection();

//CORS:
chatApp.use(
    cors({
        origin: process.env.FRONTEND_URL,
        credentials: true
    })
)

// Check if any error occurs: change here Server(server)
const io = new Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL,
        credentials: true
    }
});


// IF ANY ERROR OCCURS TRY USING THE UPLOAD ROUTE IN INDEX FILE

// DEFAULT ROUTE
// chatApp.get('/', (req, res)=>{
//     // return res.send(`<body bgcolor = "black">
//     //     <h1 color = "white">What's Up Backend Started</h1>
//     //     </body>`)
//     return res.json({
//         success: true,
//         message: "What's Up Backend Started"
//     })
// })

// Socket Io Setup
// const __dirname = dirname(fileURLToPath(import.meta.url));
// chatApp.use(express.static(join(__dirname, '../client/dist')))
// chatApp.use('/', (req, res)=>{
//     res.sendFile(join(__dirname, '../client/src/app.jsx'));
// })

io.on('connection', (socket)=>{
    console.log('a user has connected', socket.id);

    socket.on('chat message', (msg)=>{
        console.log("Message Received", msg);
        io.emit('chat message', msg);
    });

    socket.on('disconnect', ()=>{
        console.log("User Disconneected", socket.id);
    })
})



//SERVER LISTEN PORT
server.listen(PORT, '0.0.0.0', ()=>{
    console.log(`Chat App Started on ${PORT}`);
})


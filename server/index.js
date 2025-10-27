import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import { Server } from 'socket.io';
import{ createServer } from 'http'

const chatApp = express();
const server = createServer(chatApp);
const PORT = process.env.PORT || 4001;

chatApp.use(express.json());

chatApp.use(
    cors({
        origin: process.env.FRONTEND_URL,
        credentials: true
    })
)

const io = new Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL,
        credentials: true
    }
});

io.on('connection', (socket)=>{
    console.log('A user has connected', socket.id);

    socket.on('chat message', (msg) => {
        console.log('message: ', msg);
        io.emit('chat message', msg);
    })
    
    socket.on('disconnect', ()=>{
        console.log('User Has Disconnected', socket.id);
    })
})


chatApp.get('/', (req, res)=>{
    return res.send('<body bgcolor = "#6e6e6ef3"><h1>Welcome to new chat app</h1></body>')  
})
server.listen(PORT, ()=>console.log(`Server started at port: ${PORT}`));


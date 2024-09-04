//express server
const ACTIONS = require('./Actions');
const express = require('express')
const app = express();
// const cors = require('cors');
// app.use(cors());
// require('dotenv').config();
const http = require('http');
const {Server} = require('socket.io');
const server = http.createServer(app);
const io = new Server(server);

const userSocketMap = {};
function getAllConnectedClients(roomId){
    //map data structure
    return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
        (socketId)=>{
        return{
            socketId,
            username:userSocketMap[socketId],
        };
    });  //Map to array
}
// {
//     'hsgushhkjlkm': Shashi Ranjan
// }
//can be stored through reddis or others but we will store in the memory for now but if server restarts then it will get deleted
io.on('connection',(socket)=>{
    console.log('socket connected',socket.id);
    socket.on(ACTIONS.JOIN,({roomId,username})=>{
        userSocketMap[socket.id] = username;
        socket.join(roomId);
        const clients = getAllConnectedClients(roomId);
        // console.log('My',clients);
        clients.forEach(({ socketId })=>{
            io.to(socketId).emit(ACTIONS.JOINED,{
                clients,
                username,
                socketId: socket.id,
            });
        });
    });
});

const PORT = process.env.PORT ||5000
server.listen(PORT,()=> console.log(`listening on port ${PORT}`));
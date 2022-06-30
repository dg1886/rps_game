const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");
const socketio = require("socket.io");


require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000; 
const server = http.createServer(app);
const io = new Server(server);


app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const usersRouter = require('./routes/users');

app.use('/users', usersRouter(app, express));

const {
  createRoom,
  joinRoom,
  exitRoom,
  getWinPoints,
 
} = require("./utils/rooms");



io.on("connection", socket => {
  io.of("/").adapter.on("join-room", (room) => {
    const keyRoom = io.sockets.adapter.rooms.keys()
    const roomsData = {};
    const { roomId } = socket.handshake.query
    console.log(socket.handshake)

    // TODO:
    // take keys room (roomName) for checking available room (no more than 2 people)

    // console.log(io.sockets.adapter.rooms.get('free1').values().next().value)
    // for (let i of keyRoom) {
    //   console.log(i)
    // }    
    // console.log(io.sockets.adapter.rooms[Symbol.iterator]())
    // console.log(socket.client.sockets.keys()[0])

    io.sockets.adapter.rooms.forEach((val, key) => {
      roomsData[key] = Array.from(val).length;
    })
    const rooms = Array.from(io.sockets.adapter.rooms.keys());
    io.emit("available-rooms", roomsData)
  });

  // Hardcode rooms
  socket.join('free1');  
  socket.join('free2');  

  // TODO:
  // make method for create room with unic name(id)
  socket.on("create-room", () => {
    // id=naniod();
    socket.join(id);  
  });

  // join room
  socket.on("join-room", (roomId, playerName) => {
    socket.join(roomId)
    socket.emit("connected-to-room", roomId);
    socket.broadcast.to(roomId).emit(`player-${playerName}-connected`);    
  });

  // TODO:
  // make methods for leave, delete,random connect  rooms
  // socket.on("join-random", () => {
   
  // });

  // socket.on("leave-room", () => {
   
  // });

  // socket.on("delete-room", () => {
   
  // });

  //battle method
  socket.on("battle", (playerChoices)=>{
    const result = getWinPoints(playerChoices)
    socket.broadcast.to(roomId).emit("battle-result",result)   
  })
 
  //chat method
  socket.on('message', ({ name, message }) => {
    io.emit('message', { name, message })
  })

})

server.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

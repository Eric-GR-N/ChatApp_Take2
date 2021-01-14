const app = require('express')();
const server = require('http').createServer(app);
const socket = require('socket.io');
const io = socket(server);

//require('dotenv').config()

server.listen(5000, ()=>{
    console.log('Hello, im listening');
})



io.on("connection", function(socket) {

  socket.on('message1', (data)=>{
    io.emit('message1', {
      message: data.message
    })
  })

  socket.on('message2', (data)=>{
    io.emit('message2', {
      message: data.message
    })
  })

  socket.on('message3', (data)=>{
    io.emit('message3', {
      message: data.message
    })
  })
 });
 

app.get('/', (req, res)=>{
    res.send('Hello World');
  })




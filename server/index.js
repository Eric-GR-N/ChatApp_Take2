const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.listen(4000, ()=>{
    console.log('Hello, im listening');
})

io.on('connection', (socket)=>{
    console.log('We have got a connection!')
})


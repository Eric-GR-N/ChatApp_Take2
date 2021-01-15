const app = require('express')();
const server = require('http').createServer(app);
const socket = require('socket.io');
const io = socket(server);
const mysql = require('mysql');
require('dotenv').config();

//Connecting database
const db = mysql.createPool({
  host: "localhost",
  user: "Eric",
  password: process.env.DB_PASSWORD,
  database: "chatapp_socket_db"
})

server.listen(5000, ()=>{
    console.log('Hello, im listening on port 5000');
})



io.on("connection", function(socket) {

  //query data for fitness chat
  socket.on('fitness', (data)=>{

    
    const {message, time, date} = data;
    const sqlInsertFitness = 'INSERT INTO fitness (message, time, date) VALUES (?,?,?)';

    db.query(sqlInsertFitness,[message, time, date], (err, res)=>{
      console.log('Data sent to fitness table');
    });

    io.emit('fitness', {
      message: data.message
    })
  })

  //query data for music chat
  socket.on('music', (data)=>{
    

    const {message, time, date} = data;
    const sqlInsertMusic = 'INSERT INTO music (message, time, date) VALUES (?,?,?)';

    db.query(sqlInsertMusic,[message, time, date], (err, res)=>{
      console.log('Data sent to music table');
    })

    io.emit('music', {
      message: data.message
    })
  })

  //query data for politics chat
  socket.on('politics', (data)=>{

    const {message, time, date} = data;
    const sqlInsertPolitics = 'INSERT INTO politics (message, time, date) VALUES (?,?,?)';

    db.query(sqlInsertPolitics,[message, time, date], (err, res)=>{
      console.log('Data sent to politics table');
    })

    io.emit('politics', {
      message: data.message
    })
  })

  //query data for religion chat
  socket.on('religion', (data)=>{

    const {message, time, date} = data;
    const sqlInsertReligion = 'INSERT INTO religion (message, time, date) VALUES (?,?,?)';

    db.query(sqlInsertReligion,[message, time, date], (err, res)=>{
      console.log('Data sent to religion table');
    })

    io.emit('religion', {
      message: data.message
    })
  })

    //query data for sports chat
    socket.on('sports', (data)=>{

      const {message, time, date} = data;
      const sqlInsertSports = 'INSERT INTO sports (message, time, date) VALUES (?,?,?)';
  
      db.query(sqlInsertSports,[message, time, date], (err, res)=>{
        console.log('Data sent to sports table');
      })
  
      io.emit('sports', {
        message: data.message
      })
    })

 });
 

app.get('/', (req, res)=>{
    res.send('The Backend are up and running');
  })




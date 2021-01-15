const express = require('express');
const app = express();
const server = require('http').createServer(app);
const socket = require('socket.io');
const io = socket(server);
const mysql = require('mysql');
const PORT = 5000;
let tableSwitch = 'fitness';
require('dotenv').config();


//Connecting database
const db = mysql.createConnection({
  host: "localhost",
  user: "Eric",
  password: process.env.DB_PASSWORD,
  database: "chatapp_socket_db"
})


//Setting port for the backend
server.listen(PORT, ()=>{
    console.log(`Hello, im listening on ${PORT}`);
})

io.on("connection", function(socket) {

  //Sends chat to everybode that a new connection to the app is made
  io.emit('new_connection', {
    message: 'A new user has connected to the app!',
    greeting: 'Welcome to the chatroom, lets start chatting'
  })

  //Decides wich table we will retrieve data from
  socket.on('room', (data)=>{
    const {table} = data;
    tableSwitch = table.toLowerCase();
  })

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


//Fetches our aggregated data with api from database, in this example we are searching for the longest message
app.get('/getdata', (req, res)=>{
  const queryString = `SELECT * FROM ${tableSwitch} WHERE LENGTH(message) = (SELECT MAX(LENGTH(message))FROM ${tableSwitch})`
  db.query(queryString, (err, result)=>{
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
})




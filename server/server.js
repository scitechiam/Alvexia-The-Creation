const { SERVER_PORT } = require('../config');
const connectDB = require("./database/connection");
const express = require('express'); 
const http = require('http'); 
const socketIO = require('socket.io');
const router = require("./routes/router");
const verifyToken = require("./routes/auth/verifyToken.js").verifySocketToken;

const app = express();
const server = http.createServer(app);
const io = socketIO(server); 
app.use(express.json());

connectDB();

app.use(router);

module.exports = io;
const sock = require("./engine/socket.js");

io.users = {};
io.on('connection', (socket) => {
    // Leer el token desde el handshake
    const token = socket.handshake.query.token;
  
    if (!token) {
      socket.emit('error', 'NO_TOKEN');
      return socket.disconnect();
    }
  
    const authTimeout = setTimeout(() => {
      socket.emit('error', 'AUTHENTICATION_TIMEOUT'); 
      socket.disconnect(); 
    }, 3000); // 3 segundos para autenticar
  
    // Verificar el token de JWT
    const verifiedToken = verifyToken(token);
  
    if (!verifiedToken.valid) {
      socket.emit('error', 'INVALID_TOKEN');
      return socket.disconnect();
    }
  
    clearTimeout(authTimeout);
    socket.emit('authenticated', 'User authenticated successfully');
    socket.user_id = verifiedToken.user.id;
    io.users[socket.user_id] = socket;
    sock(socket , io);
  
    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
      clearTimeout(authTimeout); 
    });
  });

// Iniciar servidor
server.listen(SERVER_PORT, () => {
    console.log('Server running ' + SERVER_PORT);
});

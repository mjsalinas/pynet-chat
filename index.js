const path = require('path');
const express = require('express');
const app = express();

//configuraciones 
app.set('port', process.env.PORT || 5000);

//archivos estaticos
app.use(express.static(path.join(__dirname, 'public')));

//iniciar servidor
const server = app.listen(app.get('port'), ()=> {
    console.log('server on port', app.get('port'));
});

const SocketIO = require('socket.io');
const io = SocketIO(server);

//websockets
io.on('connection', (socket) =>{
socket.on('chat:message', (data) =>{
    io.sockets.emit('mensaje del servidor', data)
}),
socket.on('chat:typing', (data) => {
    socket.broadcast.emit('chat:typing', data);
});
socket.on('chat:clear', (data) => {
    socket.emit('chat:clear', data);
});
});
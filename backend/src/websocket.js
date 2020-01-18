const socketio = require('socket.io');
const connections = [];
const parseString = require('./utils/parseString')
const calculateDistance = require('./utils/calculateDistance')
let io;

exports.setupWebSocket = (server) =>{
  io = socketio(server);
  io.on('connection', socket => {
     const { latitude, longitude, techs} = socket.handshake.query;
      connections.push({
          id: socket.id,
            coordinates:{
                latitude: Number(latitude),
                longitude: Number(longitude),
            },
            techs: parseString(techs),
      })
  })
};

exports.findConnections = (coordinates, techs) =>{
    return connections.filter(connections =>{
        return calculateDistance(coordinates, connections.coordinates) < 10
         && connections.techs.some(item => techs.includes(item));
    })
}

exports.sendMessage = (to, message, data) =>{
    to.forEach(connection => {
        io.to(connection.id).emit(message, data);
    })
}
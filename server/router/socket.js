// const app = require('express')();
// const io = require('socket.io')(server, {
//   cors : { origin : "*"}
// });

module.exports = (server) => {
  const app = require('express')();
  const io = require('socket.io')(server, {
    cors : {origin : "*"}
  })

  const chat = io.of('/chat').on('connect', (socket) => {
    console.log('chat connect');
    socket.on('join', data => {
      console.log("join user")
      const name = socket.name = data.name;
      const room = socket.room = data.room;

      const msg = {
        name : name,
        msg : `${name} 님이 ${room} 방에 접속하였습니다.`,
      }

      socket.join(room);
      chat.to(room).emit('join', msg);
    });
    socket.on('chat', msg => {
      const data = {
        msg : msg,
        name : socket.name
      }
      chat.to(socket.room).emit('chat', data);
    })
  })

  io.on('connect', (socket) => {
    console.log('io Connect');
    socket.on('join', data => {
      const name = socket.name = data.name;
      const room = socket.room = data.room;
      socket.join(room);
      io.to(room).emit('join', `${name} is ${room} join success`);
    });
    socket.on('chat', msg => {
      const data = {
        msg : msg,
        name : socket.name
      }
      io.to(socket.room).emit('chat', data);
    })
  });

};

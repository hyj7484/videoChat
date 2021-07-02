// const app = require('express')();
// const io = require('socket.io')(server, {
//   cors : { origin : "*"}
// });

module.exports = (server) => {
  const app = require('express')();
  const io = require('socket.io')(server, {
    cors : {origin : "*"}
  })
  const clients = new Map();

  const video = io.of('/video').on('connect', socket => {
    socket.on('init', data => {
      socket.name = data.name;
      socket.room = data.room;

      socket.join(socket.room);
      const msg = {
        room : socket.room,
        msg : `${socket.name}님이 ${socket.room} 방에 입장하였습니다.`,
      }
      video.to(socket.room).emit('init', msg);
    });

    socket.on('offer', data => {
      console.log('socket on offer');
      socket.to(socket.room).emit('offer', data);
    });
    socket.on('answer', data => {
      console.log('socket on asnwer');
      socket.to(socket.room).emit('answer', data);
    });
    socket.on('new-ice-candidate', msg => {
      console.log('socket on new-ice-candidate');
      console.log(msg);
    })

    socket.on('disconnect', () => {
      const msg = `Client ${socket.name} disconnect`;
      socket.leave(socket.room);
      video.to(socket.room).emit('out', msg);
    });
      // 접속된 모든 클라이언트에게 메시지를 전송한다
      // io.emit('event_name', msg);

      // 메시지를 전송한 클라이언트에게만 메시지를 전송한다
      // socket.emit('event_name', msg);

      // 메시지를 전송한 클라이언트를 제외한 모든 클라이언트에게 메시지를 전송한다
      // socket.broadcast.emit('event_name', msg);

      // 특정 클라이언트에게만 메시지를 전송한다
      // io.to(id).emit('event_name', data);
  });

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
};

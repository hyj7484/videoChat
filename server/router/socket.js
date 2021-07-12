// const app = require('express')();
// const io = require('socket.io')(server, {
//   cors : { origin : "*"}
// });
let user = [];
let socketRoom = {};


module.exports = (server) => {
  const app = require('express')();
  const io = require('socket.io')(server, {
    cors : {origin : "*"}
  })

  const video = io.of('/video').on('connect', socket => {
    socket.on('init', data => {
      if(user[data.room]){
        if(user[data.room].length >= 2){
          console.log('Full user');
          socket.emit('fullUser', 'full User');
          return;
        }
        user[data.room].push({id : socket.id, name : data.name});
      }else{
        user[data.room] = [{id : socket.id, name : data.name}];
      }

      socket.join(data.room);
      socket.room = data.room;
      socket.name = data.name;
      socketRoom[socket.id] = data.room;
      console.log(`${socket.name}님이 ${socket.room}번 방에 참여하였습니다.`);
      const msg = {
        room : socket.room,
        msg : `${socket.name}님이 ${socket.room}번 방에 참여하였습니다.`,
        userCount : user[data.room].length,
      }
      socket.to(socket.room).emit('init', msg);
    });

    socket.on('offer', data => {
      console.log('socket on offer');
      socket.to(socket.room).emit('offer', data);
    });
    socket.on('answer', data => {
      console.log('socket on asnwer');
      socket.to(socket.room).emit('answer', data);
    });
    socket.on('candidate', msg => {
      console.log('socket on candidate');
      socket.to(socket.room).emit('candidate', msg);
    });

    socket.on('disconnect', () => {
      const msg = `Client ${socket.name} disconnect`;
      console.log(`${socket.name}님이 ${socket.room}번 방을 나감 disconnect`);
      const room = socketRoom[socket.id];
      delete socketRoom[socket.id];
      if(user[room]){
        user[room] = user[room].filter(user => user.id !== socket.id);
      }
      socket.leave(room);
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
    socket.on('join', data => {
      console.log("join user")
      const name = socket.name = data.name;
      const room = socket.room = data.room;
      const msg = {
        name : name,
        msg : `${name} 님이 ${room} 방에 접속하였습니다.`,
      }

      socket.join(room);
      socket.to(room).emit('join', msg);
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

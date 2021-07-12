const mysql = require('mysql');
const connection = mysql.createConnection({
  host : '3.138.143.93',
  user : 'dbconnect',
  password : 'dydwn123',
  database : 'videochat',
});

connection.connect();

module.exports = connection;

/*
  tables

  users :
    userNumber int(100) primary key auto_increment,
    id varchar(50) unique not null,
    pw varchar(50) not null,
    name varchar(30) not null,
    mail varchar(100) not null,
    phone varchar(20) not null,

  friends :
    userId varchar(50) not null,
    friendId varchar(50) not null,
    date date default now(),

    foreign key ( userId ) references users ( id )  on delete cascade on update cascade,
    foreign key ( friendId ) references users ( id )  on delete cascade on update cascade,

  roomList :
    room varchar(100) not null,
    userCount int(100) not null default 0,
    host varchar(50) not null,
    foreign key ( host ) references users ( id )  on delete cascade on update cascade,
*/

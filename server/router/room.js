const app = require('express')();
const mysql = require('../database/mysql');

app.post('/getroomlist', (req, res, next) => {
  const userId = req.body.userId;
  const query = `select * from room where hostId != ${userId}`;

});

app.post('/makeroom', (req, res, next) => {
  
});

module.exports = app;

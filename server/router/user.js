const app = require('express')();
const mysql = require('../database/mysql');

app.post('/addUser', (req, res, next) => {
  const id = req.body.id || "";
  const pw = req.body.pw || "";
  const name = req.body.name || "";
  const selQuery = `select * from users where userid = '${id}'`;
  const query = `insert into users(userid, username, userpw) values('${id}', '${name}', '${pw}')`;

  if(id == "" || pw == "" || name == ""){
    res.json({chk:false, msg:"입력되지 않은 값이 존재합니다."});
  }else{
    mysql.query(selQuery, (err, rows) => {
      console.log(rows.length);
      if(rows.length == 0 || rows[0].userid != id){
        mysql.query(query, (err, rows) => {
          if(err) throw err;
          else res.json({chk:true, msg:rows[0]});
        });
      }else{
        res.json({chk:false, msg:"중복된 아이디가 존재합니다."});
      }
    });
  }
});

app.post('/login', (req, res, next) => {
  const id = req.body.id;
  const pw = req.body.pw;
  const query = `select * from users where userid = '${id}' and userpw = '${pw}'`;
  mysql.query(query, (err, rows) => {
    if(err) throw err;
    else{
      if(rows.length == 0){
        res.json(false);
      }else{
        res.json(rows[0]);
      }
    }
  })
});

module.exports = app;

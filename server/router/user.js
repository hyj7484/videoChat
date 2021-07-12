const app = require('express')();
const mysql = require('../database/mysql');

/*
  add User

  use data :
    id, pw, name, mail, phone


*/

app.post('/addUser', (req, res, next) => {
  const id = req.body.id || "";
  const pw = req.body.pw || "";
  const name = req.body.name || "";
  const mail = req.body.mail || "";
  const phone = req.body.mail || "";

  const selQuery = `select * from users where userid = '${id}'`;
  const query = `insert into users(id, pw, name, mail, phone) values('${id}', '${pw}', '${name}', '${mail}', '${phone}')`;

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
/*
  로그인 page
  use data :
    user Id
    user Pw

  select length === 0 => return false
  else return data
*/
app.post('/login', (req, res, next) => {
  console.log('user login');
  const id = req.body.id;
  const pw = req.body.pw;
  const query = `select * from users where id = '${id}' and pw = '${pw}'`;
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

const app     = require('express')();
const server  = require('http').createServer(app);
const cors        = require('cors');
const bodyparser  = require('body-parser');

// const io      = require('socket.io')(server, {
//   cors : { origin : "*" }
// });

app.use(cors());
app.use(bodyparser.json());

module.exports = server ;

const io = require('./router/socket')(server);
const ap = require('./app');
app.use('/api', ap);


const port  = 3002
server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

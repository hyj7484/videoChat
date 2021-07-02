const router = require('express')();
const user = require('./router/user');
const room = require('./router/room');

router.use('/user', user);
router.use('/room', room)

module.exports = router;

const router = require('express')();
const user = require('./router/user');

router.use('/user', user);


module.exports = router;

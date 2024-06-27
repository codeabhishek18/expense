const router = require('express').Router();
const registerRoute = require('./register.route');
const userRoute = require('./user.route');

router.use('/register', registerRoute);
router.use('/user', userRoute);

module.exports = router;
const router = require('express').Router();
const { loginUser, signUpUser, deleteUser } = require('../Controller/user.controller');
const schemaValidation = require('../Middlewares/user.middleware');
const { loginSchema, signupSchema } = require('../Validators/user.validation');
const validateLogin = schemaValidation(loginSchema);
const validateSignup = schemaValidation(signupSchema);

router.post('/login', validateLogin, loginUser)
router.post('/signup', validateSignup, signUpUser)
router.delete('/delete-user/:id', deleteUser)

module.exports = router;
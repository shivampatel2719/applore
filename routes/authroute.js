const express = require('express')
const router = express.Router()
const AuthController = require('../controller/AuthController')

router.post('/register',AuthController.verifyNotAuthentication,AuthController.registerUser);
router.post('/login',AuthController.verifyNotAuthentication,AuthController.loginUser);

module.exports = router;
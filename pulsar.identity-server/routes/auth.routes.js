const router = require('express').Router();

const authController = require('../controllers/auth.controller');

router.post('/signin',authController.SignIn);

router.post('/login', authController.LogIn);

router.get('/logout', authController.LogOut);

router.get('/check-token', authController.CheckToken);


module.exports = router;
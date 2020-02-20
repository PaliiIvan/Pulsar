const router = require('express').Router();

const authController = require('../controllers/auth.controller');
const { SignUpValidation, LoginValidation } = require('../features/user/user.validation');



router.post('/signup', SignUpValidation, authController.SignUp);

router.get('/complete-auth' ,authController.CompleteAuth)

router.post('/login', LoginValidation, authController.LogIn);

router.get('/logout', authController.LogOut);

router.get('/check-token', authController.CheckToken);


module.exports = router;
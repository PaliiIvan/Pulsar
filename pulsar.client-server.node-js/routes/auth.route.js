const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.controller');

router.get('/auth', authController.getAuth);

router.get('/auth-success', authController.getAuthSuccess);

module.exports = router;
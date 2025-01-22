const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

// POST /api/auth/signup
router.post('/signup', authController.signUp);

// POST /api/auth/signin
router.post('/signin', authController.signIn);

module.exports = router;

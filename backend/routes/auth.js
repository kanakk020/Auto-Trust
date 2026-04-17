const express = require('express');
const router = express.Router();
const { registerUser, loginUser, findFreelancer, findClient } = require('../controllers/authController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/freelancer/:email', findFreelancer);
router.get('/client/:email', findClient);

module.exports = router;

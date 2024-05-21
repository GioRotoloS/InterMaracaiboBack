const express = require('express');
const router = express.Router();

const {
    getUsers,
    register,
    login
} = require('../services/auth');

router.get('/users', getUsers);
router.post('/register', register);
router.post('/login', login);

module.exports = router;
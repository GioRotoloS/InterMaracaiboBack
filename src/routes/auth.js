const express = require('express');
const router = express.Router();

const {
    getUsers,
    register
} = require('../services/auth');

router.get('/users', getUsers);
router.post('/register', register);

module.exports = router;
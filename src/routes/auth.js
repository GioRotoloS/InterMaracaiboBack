const express = require('express');
const router = express.Router();

const {
    getUsers,
    register,
    login,
    logout,
    deleteUser
} = require('../services/auth');

router.get('/users', getUsers);
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.delete('/delete', deleteUser);

module.exports = router;
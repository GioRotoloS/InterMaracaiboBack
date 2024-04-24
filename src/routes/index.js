const express = require('express');
const router = express.Router();

//Aqui van todas las rutas
const auth = require('./auth');

router.use('/auth', auth);


module.exports = router;
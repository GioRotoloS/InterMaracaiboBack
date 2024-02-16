const express = require('express');

require('dotenv').config();
const app = express();

//BD conection


const routes = require('./src/routes');

app.disable('x-powered-by');
app.use(express.json({ 'limit': '5mb' }));

app.all('*', function (_, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', '*');
	res.header('Access-Control-Allow-Credentials', true);
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	next();
});

app.use('/api', routes);

module.exports = app;
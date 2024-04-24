const mysql = require("mysql2");
const { config } = require("dotenv");

config()

const DB_HOST = process.env.HOST;
const DB_USER = process.env.USER;
const DB_PASSWORD = process.env.PASSWORD;
const DB_DATABASE = process.env.DB;

const connection = mysql.createConnection({
  host:DB_HOST,
  user:DB_USER,
  password:DB_PASSWORD,
  database:DB_DATABASE
 });
 connection.connect(function(error){
  if(!!error) {
   console.log(error);
  } else {
   console.log('Database Connected Successfully..!!');
  }
 });
 
 module.exports = connection;
const mysql = require('mysql2');


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "login_register"
});
  
module.exports = db;
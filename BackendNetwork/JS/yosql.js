/*
yosql.js

Wrapper for mysql node package to make queries simpler
uses a pool to make functions easier

*/

const mysql = require('mysql');

const connection = mysql.createPool({
    //db is the host and that name is assigned based on the 
    //container name given in the docker-compose file
    connectionLimit : 10,
    host: '35.232.22.225',
    port: '3306',
    user: 'express-api-backend',
    password: '',
    database: 'YO'
  });
  
exports.query = function(query, queryFunction){
  connection.query(query,queryFunction);
}
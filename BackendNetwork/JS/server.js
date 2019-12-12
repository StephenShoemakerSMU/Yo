/*
server.js
Server config file for Yo API
yo uses an express API to connect with a mysql database
*/


const bodyParser = require('body-parser');
const cors = require('cors');

const { log, ExpressAPILogMiddleware } = require('@rama41222/node-logger');

var account = require('./accountRoutes.js');
const yoRoutes = require('./yoRoutes.js');

const session = require('express-session');

const express = require('express');

const app = express();

app.use(session({
    'secret': 'Yo',
     resave : false,
     saveUninitialized : true
  }));

const config = {
    name : 'Yo Api',
    port : 8000,
    host : '0.0.0.0'
};  


app.use(bodyParser.json());
app.use(cors());
const logger = log({ console: true, file: false, label: config.name });
app.use(ExpressAPILogMiddleware(logger, { request: true }));


server = app.listen(8000,function(){

});


app.get('/', function(req,res){
    res.send('Yo');
});

account.init(app);
yoRoutes.init(app);

console.log("YO express API running");
 
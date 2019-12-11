const bodyParser = require('body-parser');
const cors = require('cors');
const accountRoutes = require('./accountRoutes.js');
const { log, ExpressAPILogMiddleware } = require('@rama41222/node-logger');
var account = require('./accountRoutes.js');
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



 
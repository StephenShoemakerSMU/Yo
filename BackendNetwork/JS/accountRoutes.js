var mysql;

getUsername = function(req,res){
    mysql.query(`SELECT username FROM users WHERE id = '${req.params.id}';`, function(err,rows,fields){
        if(err){
            console.log(err.message);
            res.sendStatus(404);
        } else {
            res.send(rows);
        }
    });
}

exports.init = function(app){
    mysql = require('./yosql.js');
    app.get('/account/getUsername/:id', getUsername);
}


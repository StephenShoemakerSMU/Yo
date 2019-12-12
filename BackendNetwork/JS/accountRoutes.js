var mysql;
const crypto = require('crypto');
const passwordHash = require('password-hash');

getId = function(username){
    mysql.query(`SELECT id FROM users WHERE username = '${username}';`, function(err,rows,fields){
        return rows[0].id;
    });
}

exports.addId = function(req,res,next){
    mysql.query(`SELECT id FROM users WHERE username = '${req.session.username}';`, function(err,rows,fields){
        req.session.userId = rows[0].id;
        req.session.save();
        
        return next();
    });
}

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

generateSalt = function(){
    return crypto.randomBytes(16).toString('hex');
}

setPassword = function(user, password, res){
    salt = generateSalt();
    hash =  crypto.pbkdf2Sync(password, salt,  
                    1000, 64, `sha512`).toString(`hex`);
    
    mysql.query(`UPDATE users SET salt = '${salt}', hash = '${hash}' WHERE username = '${user}';`,function(err,rows,fields){
        if(err){
            res.sendStatus(404);
        } else {res.sendStatus(200);    }
        });
}

attemptLogin = function(username,password,req, res){
    mysql.query(`SELECT count(*) as length, salt FROM users WHERE username = '${username}';`, function(err,rows,fields){
        if(rows[0].length != 0){
            hash = crypto.pbkdf2Sync(password, rows[0].salt,  
                1000, 64, `sha512`).toString(`hex`);
            mysql.query(`SELECT count(*) as length FROM users WHERE username = '${username}' AND hash = '${hash}';`, function(err,row2,fields){
                if(row2[0].length != 0) {
                    req.session.loggedIn = true;
                    req.session.username = username;
                    req.session.save();
                    res.sendStatus(200);
                }
                else {
                    res.sendStatus(404);
                }

            })
        } else {
            res.sensStatus(404);
        }        

    })
}

createAccount = function(req,res){
    user = req.body.username;
    pass = req.body.pass;

    mysql.query(`INSERT INTO users(username) VALUES('${user}');`, function(err,rows,fields){
        if(err){
            console.log(err.message);
            res.sendStatus(404);
        } else {
            setPassword(user, pass,res);
            
        }
    });

}

login = function(req,res){
    attemptLogin(req.body.username,req.body.pass,req,res);
}

exports.isLoggedIn = function(req,res,next){
    if(req.session.loggedIn){
        return next();
    }

    res.sendStatus(404);

}

block = function(req,res){
    mysql.query(`INSERT INTO blockedUsers(blocker,blocked) VALUES('${req.session.userId}', ${req.body.blockedId})`,function(err,rows,fields){
        if(err){
            console.log(err.message);
            res.send(404);
        } else {
            res.send(200);
        }
    })
}

exports.init = function(app){
    mysql = require('./yosql.js');
    app.get('/account/getUsername/:id', getUsername);
    app.post('/account/createAccount', createAccount);
    app.get('/account/login', login);
    app.get('/generatePassword/:password', setPassword);
    app.post('/block', this.isLoggedIn,this.addId,block)
}





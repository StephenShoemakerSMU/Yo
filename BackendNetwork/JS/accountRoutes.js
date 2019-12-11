var mysql;
const crypto = require('crypto');
const passwordHash = require('password-hash');

getId = function(username){
    mysql.query(`SELECT id FROM users WHERE username = '${username}';`, function(err,rows,fields){
        return rows[0].id;
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
    console.log(user);
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
        console.log(rows);
        if(rows[0].length != 0){
            console.log(rows[0].salt);
            hash = crypto.pbkdf2Sync(password, rows[0].salt,  
                1000, 64, `sha512`).toString(`hex`);
            console.log(hash);
            mysql.query(`SELECT count(*) as length FROM users WHERE username = '${username}' AND hash = '${hash}';`, function(err,row2,fields){
                if(row2[0].length != 0) {
                    req.session.loggedIn = true;
                    req.session.username = username;
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

exports.init = function(app){
    mysql = require('./yosql.js');
    app.get('/account/getUsername/:id', getUsername);
    app.post('/account/createAccount', createAccount);
    app.get('/account/login', login);
    app.get('/generatePassword/:password', setPassword);
}





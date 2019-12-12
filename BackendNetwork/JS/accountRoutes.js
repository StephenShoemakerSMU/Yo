/*
AccountRoutes.js

This file is responsible for managing all account info such as username, password and blocked users for an account

uses crypto and yosql.js to manage account info


*/
const mysql = require('./yosql.js');
const crypto = require('crypto');
const passwordHash = require('password-hash');

//returns the id of a specific username
getId = function(username){
    mysql.query(`SELECT id FROM users WHERE username = '${username}';`, function(err,rows,fields){
        return rows[0].id;
    });
}

//Adds the id from a logged in user to the session
exports.addId = function(req,res,next){
    mysql.query(`SELECT id FROM users WHERE username = '${req.session.username}';`, function(err,rows,fields){
        req.session.userId = rows[0].id;
        req.session.save();
        
        return next();
    });
}

//gets the username from a specific id
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


//This function generates and returns a random salt
generateSalt = function(){
    return crypto.randomBytes(16).toString('hex');
}

//This function takes a password, generates a random salt, and sets the users salt and hash
//stores the salt and hash in the mysql database
setPassword = function(user, password, res){
    //getting a random salt
    salt = generateSalt();
    
    //hashing the salt and password
    hash =  crypto.pbkdf2Sync(password, salt,  
                    1000, 64, `sha512`).toString(`hex`);
    
    //adding the password to database
    mysql.query(`UPDATE users SET salt = '${salt}', hash = '${hash}' WHERE username = '${user}';`,function(err,rows,fields){
        if(err){
            res.sendStatus(404);
        } else {res.sendStatus(200);    }
        });
}


//Attempting a login
attemptLogin = function(username,password,req, res){
    
    //Querying to see if username exists, and if it does, get its salt
    mysql.query(`SELECT count(*) as length, salt FROM users WHERE username = '${username}';`, function(err,rows,fields){
        
        //If statement for if username exists
        if(rows[0].length != 0){
            
            //Hashing password with salt
            hash = crypto.pbkdf2Sync(password, rows[0].salt,  
                1000, 64, `sha512`).toString(`hex`);
            
            //Seeing if hash matches hash in database
            mysql.query(`SELECT count(*) as length FROM users WHERE username = '${username}' AND hash = '${hash}';`, function(err,row2,fields){
                
                //If it matches, login the session and save the user
                if(row2[0].length != 0) {
                    req.session.loggedIn = true;
                    req.session.username = username;
                    req.session.save();
                    res.sendStatus(200);
                }
                //logged in fails
                else {
                    res.sendStatus(404);
                }

            })
        } else {
            //login fails
            res.sendStatus(404);
        }        

    })
}


//Creating account function
//Requires a username and password
createAccount = function(req,res){
    //getting a username and password
    user = req.body.username;
    pass = req.body.pass;

    //adding username to users
    mysql.query(`INSERT INTO users(username) VALUES('${user}');`, function(err,rows,fields){
        //if username exists
        if(err){
            console.log(err.message);
            res.sendStatus(404);
        } else {
            //setting the password for the user
            setPassword(user, pass,res);
            
        }
    });

}

//login route
login = function(req,res){
    attemptLogin(req.body.username,req.body.pass,req,res);
}

//Function to check if user is logged in
exports.isLoggedIn = function(req,res,next){
    if(req.session.loggedIn){
        return next();
    }

    res.sendStatus(404);

}


//Route to block user
block = function(req,res){
    //Inserts blocker and blocked to blocked table
    mysql.query(`INSERT INTO blockedUsers(blocker,blocked) VALUES('${req.session.userId}', ${req.body.blockedId})`,function(err,rows,fields){
        if(err){
            console.log(err.message);
            res.send(404);
        } else {
            res.send(200);
        }
    })
}

//Initializes routes
exports.init = function(app){
    //gets the username for a specific id
    app.get('/account/getUsername/:id', getUsername);

    //creates an account
    app.post('/account/createAccount', createAccount);

    //attempts a login
    app.get('/account/login', login);

    //changes a users password
    app.post('/generatePassword/:password', setPassword);

    //blocks a user
    app.post('/block', this.isLoggedIn,this.addId,block)
}





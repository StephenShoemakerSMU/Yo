/*
yoRoutes.js
This file is used to define all routes that have to do with sending Yos, creating Yo lists, and any specific routes dealing with actually sending Yos

Uses yosql.js to make pool querys
Uses account.js to check if people are logged in etc.

must be passes the app in init to load the routes
*/


const mysql = require('./yosql.js');
const accounts = require('./accountRoutes.js');


//Route to create a yoList
//Takes a owner, name of the yoList, and who should be in the yoList
//Adds the owner to the yoList so they can recieve yos from that list
createYoList = function(req,res){
    
    //getting params
    owner = req.session.userId;
    yoList = req.body.yoList;
    yoListName = req.body.yoListName;
    
    //Adding YoList to yoList
    mysql.query(`INSERT INTO yoList(ownerId,listName) VALUES(${owner}, '${yoListName}');`,function(err,rows,fields){
        if(err){
            res.sendStatus(404);
            return;
        } else {
            //For each yoRecipient, add them to yoRecipients
            for( index = 0;index < yoList.length; index++){
                mysql.query(`INSERT INTO yoRecipients(listId,recipientId) VALUES('${rows.insertId}', '${yoList[index]}');`,function(err2,rows2,fields2){
                    if(err2){
                        console.log(err2.message);
                    }
                });
            }
            //Adding the owner to yoRecipients
            mysql.query(`INSERT INTO yoRecipients(listId,recipientId) VALUES('${rows.insertId}', '${owner}');`, function(err2,rows2,fields2){
                if(err2){
                    console.log(err2.message);
                }
            });
            //returning status
            res.sendStatus(200);
        }
        
    });
}

//Returns all yoLists and the last time a yo was sent that a certain user is a part of
getYoLists = function(req,res){

    mysql.query(`SELECT listName, lastYo FROM yoList JOIN yoRecipients ON yoList.id = yoRecipients.listId WHERE yoRecipients.recipientId = ${req.session.userId} ORDER BY yoList.lastYo DESC;`,function(err,rows,fields){
        res.send(rows);
    })
}

//Sends out a yo
generateYo = function(req,res,next){
    
    //Getting the paramaters
    senderId = req.session.userId;
    yoList = req.body.yoList;

    //Array that will be filled with everyone who should recieve the Yo
    recipientIds = [];

    //Creating a yo and adding it to the Yo table
    mysql.query(`INSERT INTO yos(senderId,recipientList,sendingTime) VALUES('${senderId}' , '${yoList}', NOW());`,function(err,rows,fields){
        if(err){
            console.log(err.message);
    
            res.sendStatus(404);
        } else {
        
        //Getting all recipients who should recieve the YO
        mysql.query(`SELECT yoRecipients.recipientId FROM users JOIN yoRecipients ON yoRecipients.recipientId = users.id WHERE users.id != ${senderId};`, function(err2,rows2,fields2){
           
            
            if(err2){
                console.log(err2.message)
            } else {
            
            //everyone wo should recieve the Yo
            req.session.currentYoIds = rows2;
            req.session.save();
            }

            //If its a picture Yo add the yoId and the link to the picture to Picture Yos
            if(req.body.type = "pic"){
                mysql.query(`INSERT INTO pictureYos(yo,link) VALUES ('${rows.insertId}','${req.body.link}');`,function(err2,rows2,fields2){
                    if(err2){
                        console.log(err2.message);
                    };
                    
                });
            }

            //setting the Last Yo time at YoList
            mysql.query(`UPDATE yoList SET lastYo = NOW() WHERE yoList.id = '${yoList}'`,function(err,rows,fields){
                if(err)console.log(err.message);
                return next();
            });
        })
        }
        
        
    });

    

    

}


//This function removes all recipients who are blocked from yoRecipients
//Called after generate yo
checkBlock = function(req,res){
   
    //Querying for all users who have blocked the current user, who sent the yo
    mysql.query(`SELECT blocker as recipientId FROM blockedUsers WHERE blocked = ${req.session.userId}`,function(err,rows,fields){
        
        //Looping through all people who blocked the yo sender
        for(index = 0; index <rows.length; index++){

            //Looping through all current Yo recipients
            for(yoIndex = 0; yoIndex < req.session.currentYoIds.length; yoIndex++){
                
                //If the yoRecipient exists in the blocker query, delete them from yoRecipients
                if(req.session.currentYoIds[yoIndex].recipientId == rows[index].recipientId){
                    req.session.currentYoIds.splice(yoIndex,1);
                    req.session.save();
                    yoIndex --;
                }
            }
        }
        
        //After this send the Yos 
        console.log(req.session.currentYoIds);

        res.send(200);
    });
    
}


//This function loads all routes into app
exports.init = function(app){

    //creates a yoList for the current user
    app.post('/createYoList', accounts.isLoggedIn, accounts.addId, createYoList);

    //sends a yo from the current user and removes blocked users
    app.post('/generateYo', accounts.isLoggedIn,accounts.addId, generateYo, checkBlock);

    //gets all yoLists the current User is a part of
    app.get('/getYoLists', accounts.isLoggedIn,accounts.addId, getYoLists);

}
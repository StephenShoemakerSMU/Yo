const mysql = require('./yosql.js');
const accounts = require('./accountRoutes.js');

createYoList = function(req,res){
    

    owner = req.session.userId;
    yoList = req.body.yoList;
    yoListName = req.body.yoListName;
    mysql.query(`INSERT INTO yoList(ownerId,listName) VALUES(${owner}, '${yoListName}');`,function(err,rows,fields){
        if(err){
            res.sendStatus(404);
            return;
        } else {
            for( index = 0;index < yoList.length; index++){
                mysql.query(`INSERT INTO yoRecipients(listId,recipientId) VALUES('${rows.insertId}', '${yoList[index]}');`,function(err2,rows2,fields2){
                    if(err2){
                        console.log(err2.message);
                    }
                });
            }
            mysql.query(`INSERT INTO yoRecipients(listId,recipientId) VALUES('${rows.insertId}', '${owner}');`, function(err2,rows2,fields2){
                if(err2){
                    console.log(err2.message);
                }
            });
            res.sendStatus(200);
        }
        
    });
}

getYoLists = function(req,res){

    mysql.query(`SELECT listName, lastYo FROM yoList JOIN yoRecipients ON yoList.id = yoRecipients.listId WHERE yoRecipients.recipientId = ${req.session.userId} ORDER BY yoList.lastYo DESC;`,function(err,rows,fields){
        res.send(rows);
    })
}

generateYo = function(req,res,next){
    senderId = req.session.userId;
    yoList = req.body.yoList;

    recipientIds = [];

    mysql.query(`INSERT INTO yos(senderId,recipientList,sendingTime) VALUES('${senderId}' , '${yoList}', NOW());`,function(err,rows,fields){
        if(err){
            console.log(err.message);
    
            res.sendStatus(404);
        } else {
        mysql.query(`SELECT yoRecipients.recipientId FROM users JOIN yoRecipients ON yoRecipients.recipientId = users.id WHERE users.id != ${senderId};`, function(err2,rows2,fields2){
            if(err2){
                console.log(err2.message)
            } else {
            req.session.currentYoIds = rows2;
            req.session.save();
            }
            if(req.body.type = "pic"){
                mysql.query(`INSERT INTO pictureYos(yo,link) VALUES ('${rows.insertId}','${req.body.link}');`,function(err2,rows2,fields2){
                    if(err2){
                        console.log(err2.message);
                    };
                    mysql.query(`UPDATE yoList SET lastYo = NOW() WHERE yoList.id = '${yoList}'`,function(err,rows,fields){
                        if(err)console.log(err.message);
                        return next();
                    });
                });
            }
        })
        }
        
        
    });

    

    

}

checkBlock = function(req,res){
   
    mysql.query(`SELECT blocker as recipientId FROM blockedUsers WHERE blocked = ${req.session.userId}`,function(err,rows,fields){
        
        for(index = 0; index <rows.length; index++){
            for(yoIndex = 0; yoIndex < req.session.currentYoIds.length; yoIndex++){
               
                if(req.session.currentYoIds[yoIndex].recipientId == rows[index].recipientId){
                    req.session.currentYoIds.splice(yoIndex,1);
                    req.session.save();
                    yoIndex --;
                }
            }
        }
        
        console.log(req.session.currentYoIds);

        res.send(200);
    });
    
}

exports.init = function(app){

    app.post('/createYoList', accounts.isLoggedIn, accounts.addId, createYoList);
    app.post('/generateYo', accounts.isLoggedIn,accounts.addId, generateYo, checkBlock);
    app.get('/getYoLists', accounts.isLoggedIn,accounts.addId, getYoLists);

}
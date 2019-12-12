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

    mysql.query(`SELECT listName FROM yoList JOIN yoRecipients ON yoList.id = yoRecipients.listId WHERE yoRecipients.recipientId = ${req.session.userId};`,function(err,rows,fields){
        res.send(rows);
    })
}

generateYo = function(req,res){
    senderId = req.session.userId;
    yoList = req.body.yoList;

    recipientIds = [];

    mysql.query(`INSERT INTO yos(senderId,recipientList,sendingTime) VALUES('${senderId}' , '${yoList}', NOW());`,function(err,rows,fields){
        if(err){
            console.log(err.message);
    
            res.sendStatus(404);
        } else {
        mysql.query(`SELECT id FROM users JOIN yoRecipients ON yoRecipients.recipientId = users.id WHERE users.id != ${senderId};`, function(err,rows,fields){
            for(index = 0; index < rows.length;index++){
                recipientIds.push(rows[index].id);
            }
            res.sendStatus(200);
        })}
    });

    

}


exports.init = function(app){

    app.post('/createYoList', accounts.isLoggedIn, accounts.addId, createYoList);
    app.post('/generateYo', accounts.isLoggedIn,accounts.addId, generateYo);
    app.get('/getYoLists', accounts.isLoggedIn,accounts.addId, getYoLists);

}
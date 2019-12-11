const mysql = require('./yosql.js');
const accounts = require('./accountRoutes.js');

createYoList = function(req,res){
    
    console.log(req.session);

    owner = req.session.userId;
    yoList = req.body.yoList;
    yoListName = req.body.yoListName;
    console.log(yoList);
    mysql.query(`INSERT INTO yoList(ownerId,listName) VALUES(${owner}, '${yoListName}');`,function(err,rows,fields){
        if(err){
            res.sendStatus(404);
        } else {
            console.log(rows);
            for( index = 0;index < yoList.length; index++){
                console.log(`INSERT INTO yoRecipients(listId,recipientId) VALUES('${rows.insertId}', '${yoList[index]}');`)
                mysql.query(`INSERT INTO yoRecipients(listId,recipientId) VALUES('${rows.insertId}', '${yoList[index]}');`,function(err2,rows2,fields2){
                    if(err2){
                        console.log(err2.message);
                    }
                });
            }
        }
    });
    
    res.sendStatus(200);

}


exports.init = function(app){

    app.post('/createYoList', accounts.isLoggedIn, accounts.addId, createYoList);

}
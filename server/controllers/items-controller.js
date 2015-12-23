var Item = require('../models/items');
var Meetup = require('../models/meetup');
var mysql = require('mysql');
    
var pool = mysql.createPool({
      host     : '172.30.1.13',
      user     : 'nahi_dev',
      password : 'nahi_dev123',
      database : 'nodejs_demo',
      port     : 3306,
      multipleStatements: true
    });

module.exports.list = function (req, res) {
    //var limit = req.query.limit;
    //console.log(limit);
    pool.getConnection(function(err, connection) {
        if(err) {
            console.log(err);
            res.send(err);
        } else {
            var sql_text = "SELECT * FROM items limit 0,10";
            connection.query(sql_text,function(err,rows){
                var result  = [];
                result.push({status: '1000', message: 'OK', data: rows});
                res.json(result);
            });
        }
    });
    
    /*Item.find({}, function (err, results) {
      //var sys = req.params.sys;
      //res.send(sys);
      res.json(results);
  });*/
}

module.exports.create = function (req, res) {
    var name = req.body.name; 
    var number = req.body.number;
    if (typeof number !== 'undefined' && number !== null && number !== '')
    {
        pool.getConnection(function(err, connection) {
            if(err) {
                console.log(err);
                res.send(err);
            } else {
                var sql = "INSERT INTO items (name) VALUES (?)";
                var sql_text = "";
                for(var i = 0; i < number; i++){
                    sql_text += mysql.format(sql, [name]) + ";";
                }
                //sql_text = sql_text.substring(0, sql_text.length - 1);
                console.log(sql_text);
                connection.query(sql_text, function(err, rows){

                    //console.log('Data received from Db:\n');
                    //console.log(rows);
                    var result  = [];
                    result.push({status: '1000', message: 'OK', data: rows});
                    res.json(result);
                    //res.end();
                });
            }
        });
    }
    
    else
    {
        var result  = [];
        result.push({status: '1001', message: 'number không được rỗng'});
        res.json(result);
    }

    /*Item.find({}, function (err, results) {
      //var sys = req.params.sys;
      //res.send(sys);
      res.json(results);
  });*/
}
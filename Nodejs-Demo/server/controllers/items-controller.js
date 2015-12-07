var Item = require('../models/items');
var Meetup = require('../models/meetup');
var mysql = require('mysql');
    
var connection = mysql.createConnection({
      host     : '172.30.1.13',
      user     : 'nahi_dev',
      password : 'nahi_dev123',
      database : 'nahi_sg_prod'
    });

module.exports.list = function (req, res) {
    
    var limit = req.query.limit;
    console.log(limit);
    connection.query('SELECT * FROM items limit 0,'+limit,function(err,rows){
      if(err) throw err;

      console.log('Data received from Db:\n');
      console.log(rows);
      res.json(rows);
    });
    
    connection.connect(function(err){
        if(!err) {
            console.log("Mysql db is connected ... \n\n");  
        } else {
            console.log("Error connecting Mysql db ... \n\n");  
        }
    });
    
    
    
    /*Item.find({}, function (err, results) {
      //var sys = req.params.sys;
      //res.send(sys);
      res.json(results);
  });*/
}
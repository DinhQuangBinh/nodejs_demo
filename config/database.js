/*****************MongoDB connection*******************/
var mongoose    = require('mongoose'),
connections     = require('express-myconnection'),
mysql           = require('mysql');
mongoose.connect('mongodb://localhost:27017/mean-demo');
/*****************************************/

/*****************mysql*******************/
//var mysqldbpool = mysql.createPool({
//      host     : '172.30.1.13',
//      user     : 'nahi_dev',
//      password : 'nahi_dev123',
//      database : 'nodejs_demo',
//      port     : 3306,
//      multipleStatements: true
//    });

module.exports = { 
    mysqldbpool :  mysql.createPool({
      host     : '172.30.1.13',
      user     : 'nahi_dev',
      password : 'nahi_dev123',
      database : 'nodejs_demo',
      port     : 3306,
      multipleStatements: true
    }) };
/*****************************************/
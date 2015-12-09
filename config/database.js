module.exports=function(app){
    /*****************MongoDB connection*******************/
    var mongoose    = require('mongoose'),
    connections     = require('express-myconnection'),
    mysql           = require('mysql');
    mongoose.connect('mongodb://localhost:27017/mean-demo');
    /*****************************************/

    /*****************mysql connection*******************/
    app.use(
        connections(mysql,{
            host: '172.30.1.13',
            user: 'nahi_dev',
            password : 'nahi_dev123',
            port : 3306,
            database:'nahi_sg_prod'
        },'request')
    );
    /*****************************************/
}
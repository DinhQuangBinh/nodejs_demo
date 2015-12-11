var express           = require('express'),
    app               = express(),
    bodyParser        = require('body-parser'),
    meetupsController = require('./server/controllers/meetups-controller'),
    mc = require('mc');

/*****************Database*******************/
var db = require(__dirname + '/config/database')(app);
/*****************************************/

/*****************Private Interface*******************/
var private = require(__dirname + '/config/private')(app);
/*****************************************/

/*****************memCache*******************/
var client = new mc.Client(['127.0.0.1'], null, mc.Strategy.hash);
client.connect(function() {
    console.log("Connected to the localhost memcache on port 11211!");
    client.set('hello', 'world', function(err, val) {
//        console.log(val);
//        console.log(err);
    });

    client.get('hello', function(err, val, flags) {
        console.log(val);
//        console.log(flags);
//        console.log(err);
    });
 });
/*****************************************/

/*****************Job Scheduler*******************/
var cron = require(__dirname + '/config/cron');
/*****************************************/

app.use(bodyParser());
/*****************Route*******************/
var routes=require(__dirname + '/config/routes')(express,app);
//app.use(app.router);
/*****************************************/

app.use(express.static(__dirname + '/public'));

app.use(function(req,res){
		res.status(400);
		res.send('Page Not Found');
	});

app.listen(3000, function() {
  console.log('I\'m Listening...');
})
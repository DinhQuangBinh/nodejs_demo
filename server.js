var express           = require('express'),
    app               = express(),
    bodyParser        = require('body-parser'),
    ipfilter          = require('express-ipfilter'),
    meetupsController = require('./server/controllers/meetups-controller'),
    mc = require('mc'),
    Stomp = require('stompjs'),
    CronJob = require('cron').CronJob;

/*****************Database*******************/
var routes=require(__dirname + '/config/database')(app);
/*****************************************/

// Whitelist the following IPs 
var ips = ['127.0.0.1'];
 
// Create the server 
app.use(ipfilter(ips, {mode: 'deny'}));

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
var job = new CronJob({
  cronTime: '1 * * * * *',
  onTick: function() {
      console.log('You will see this message every second');
        /*****************activeMQ*******************/
        // Use raw TCP sockets
        var activeMQ = Stomp.overTCP('localhost', 61613);
        // uncomment to print out the STOMP frames
        // client.debug = console.log;

        activeMQ.connect('user', 'password', function(frame) {
          console.log('connected to Stomp');

          activeMQ.subscribe('/queue/myqueue', function(message) {
            console.log("received message " + message.body);

            // once we get a message, the client disconnects
            activeMQ.disconnect();
          });

          console.log ('sending a message');
          activeMQ.send('/queue/myqueue', {}, 'Hello, node.js!');
        });
        /*****************************************/
  },
  start: true,
  timeZone: 'Asia/Ho_Chi_Minh'
});
job.start(); 
/*****************************************/

app.use(bodyParser());
/*****************route*******************/
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
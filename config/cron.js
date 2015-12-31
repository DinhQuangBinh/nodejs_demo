var CronJob = require('cron').CronJob,
    Stomp   = require('stompjs'),
    mysql           = require('mysql');

/*****************Database*******************/
//console.log(__dirname + '/database.js');
//require(__dirname + '/database');
var database = require(__dirname + '/database');
/*****************************************/
/*****************************************/

/*****************mysql*******************/

var job = new CronJob({
  cronTime: '* * * * * *',
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

var job_mysql = new CronJob({
  cronTime: '* * * * * *',
  onTick: function() {
        console.log('Mysql will insert db every 15 minutes');
        var name = 'name'; 
        var number = 5000;

        database.mysqldbpool.getConnection(function(err, connection) {
            if(err) {
                console.log(err);
                res.send(err);
            } else {
                var today = new Date();
                var dd = today.getDate();
                var mm = today.getMonth()+1; //January is 0!
                var yyyy = today.getFullYear();
                var time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();

                if(dd<10) {
                    dd='0'+dd;
                } 

                if(mm<10) {
                    mm='0'+mm;
                } 

                today = yyyy+'-'+mm+'-'+dd + ' ' + time;
                console.log(today);
                
                var sql = "INSERT INTO items (name, time) VALUES (?, ?)";
                var sql_text = "";
                for(var i = 0; i < number; i++){
                    sql_text += mysql.format(sql, [name, today]) + ";";
                }

                //console.log(sql_text);
                connection.query(sql_text, function(err, rows){
                    console.log('Write here');
                    connection.release();
                });
            }
        });
  },
  start: true,
  timeZone: 'Asia/Ho_Chi_Minh'
});
job_mysql.start();




 
var CronJob = require('cron').CronJob,
    Stomp   = require('stompjs');
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
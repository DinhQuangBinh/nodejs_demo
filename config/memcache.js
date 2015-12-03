var memjs = require('memjs');
var client = memjs.Client.create()

client.set('hello', 'world', function(err, val) {
            console.log(val);
            console.log(err);
        });

client.get('hello', function(err, val, flags) {
        //console.log(val);
            console.log(flags);
            console.log(err);
        });
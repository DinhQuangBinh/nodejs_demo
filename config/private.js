var ipfilter = require('express-ipfilter');
module.exports=function(app){
    // Whitelist the following IPs 
    var ips = ['127.0.0.1'];

    // Create the server 
    app.use(ipfilter(ips, {mode: 'deny'}));
}
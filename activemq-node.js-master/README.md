[![Build Status](https://travis-ci.org/zmhassan/activemq-node.js.png?branch=master)](https://travis-ci.org/zmhassan/activemq-node.js) [![Dependency Status](https://gemnasium.com/zmhassan/activemq-node.js.png)](https://gemnasium.com/zmhassan/activemq-node.js) [![Code Climate](https://codeclimate.com/github/zmhassan/activemq-node.js.png)](https://codeclimate.com/github/zmhassan/activemq-node.js)

# ActiveMQ-Node.js
 

This is a Node.JS Client for integrating Apache ActiveMQ into your Node.JS application. As we all know everything on the web starts off as experimental.


#Architecture:



See the following wiki:

https://github.com/zmhassan/activemq-node.js/wiki/Architecture:-Node.JS-replacing-existing-web-console-for-ActiveMQ






# Features:
 

Methods that exist currently to access ActiveMQ:

stomp.js, web sockets, jmx, Jolokia, spray , etc.

We will abstract away all the mechanics for data access and let you the developer focus on getting access to your data.



# Why this project:
 
 
Developers can always do stuff from scratch but really in 2014 who wants to do things from scratch now a days. 

From a re-usability perspective developers might find better ways to optimize stuff which will help people solve more complex problems. Finally, we want to abstract away all the mechanics involved and get to what we truly want which is quick and easy data access.





# Table of Contents
 

- [Installation](#installation)
- [Synopsis](#synopsis)
- [Connection](#connection)
  - [Connection options and URL](#connection-options-and-url)
  - [connection.publish(queueName, body, options, callback)](#connectionpublishqueuename-body-options-callback)
  - [connection.end()](#connectionend)
- [Queue](#queue)
  - [connection.queue(name, options, openCallback)](#connectionqueuename-options-opencallback)
  - [queue.subscribe([options,] listener)](#queuesubscribeoptions-listener)
  - [queue.subscribeRaw([options,] listener)](#queuesubscriberawoptions-listener)
  - [queue.unsubscribe(consumerTag)](#queueunsubscribeconsumertag)
  - [queue.shift([reject[, requeue]])](#queueshiftreject-requeue)
  - [queue.bind([exchange,] routing)](#queuebindexchange-routing)
  - [queue.unbind([exchange,] routing)](#queueunbindexchange-routing)
  - [queue.bind_headers([exchange,] routing)](#queuebind_headersexchange-routing)
  - [queue.destroy(options)](#queuedestroyoptions)
- [Exchange](#exchange)
  - [exchange.on('open', callback)](#exchangeon'open'-callback)
  - [connection.exchange()](#connectionexchange)
  - [connection.exchange(name, options={}, openCallback)](#connectionexchangename-options={}-opencallback)
  - [exchange.publish(routingKey, message, options, callback)](#exchangepublishroutingkey-message-options-callback)
  - [exchange.destroy(ifUnused = true)](#exchangedestroyifunused-=-true)
  - [exchange.bind(srcExchange, routingKey [, callback])](#exchangebindsrcexchange-routingkey--callback)
  - [exchange.unbind(srcExchange, routingKey [, callback])](#exchangeunbindsrcexchange-routingkey--callback)
  - [exchange.bind_headers(exchange, routing [, bindCallback])](#exchangebind_headersexchange-routing--bindcallback)

## Building 

```javascript
npm install
npm install -g grunt-cli
```

## Contribute

This is an open source project so that means that anyone and everyone can join.  

Email me at:

zak.hassan1010@gmail.com



## Installation
```javascript
    npm install activemq-node.js
    
    Caution: You will not be able to do this yet as this project is beta..
```
## Synopsis


An example of connecting to a server and listening on a queue.

```javascript
var activemq = require('activemq-node');

var con = activemq.createConnection({ host: 'http://localhost:8161/', protocol: 'jolokia' });

con.on('ready', function () {
  con.queue('my-queue', function(queue){
      queue.subscribe(function (msg) {
        console.log(msg);
      });
  });
});
```


## Connection

`new activemq.createFactory()` Instantiates a new connection. Use
`con.connect()` to connect to a server.

`activemq.createFactory()` returns an instance of `activemq.ConnectionFactory`, which contains
an instance of `net.Socket` at its `socket` property. All events and methods which work on
`net.Socket` can also be used on an `amqp.Connection` instance. (e.g., the
events `'connect'` and `'close'`.)

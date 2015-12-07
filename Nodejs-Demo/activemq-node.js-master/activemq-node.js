'use strict';
var connection = require('./lib/connection');

module.exports = {
  connection: connection,
  createConnection: function (options, implOptions, readyCallback) {
    var c = new Connection(options, implOptions, readyCallback);
    c.connect();
    return c;
  }
};

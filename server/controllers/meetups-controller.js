var Meetup = require('../models/meetup');

module.exports.create = function (req, res) {
    try {
        var meetup = new Meetup(req.body);
        meetup.name = req.body.name;
        meetup.age = req.body.age;
        meetup.save(function (err, results) {
            //res.json(result);
            var result  = [];
            result.push({status: '1000', message: 'OK', data: results});
            res.contentType('application/json');
            res.send(JSON.stringify(result));
        });       
    } catch (ex) {
        var result  = [];
        result.push({status: '1001', message: 'ERROR'});
        res.contentType('application/json');
        res.send(JSON.stringify(result));
    }
}

module.exports.list = function (req, res) {
    try {
        Meetup.find({}, function (err, results) {
            //res.json(results);
            var result  = [];
            result.push({status: '1000', message: 'OK', data: results});
            res.contentType('application/json');
            res.send(JSON.stringify(result));
        });       
    } catch (ex) {
        var result  = [];
        result.push({status: '1001', message: 'ERROR'});
        res.contentType('application/json');
        res.send(JSON.stringify(result));
    }
}
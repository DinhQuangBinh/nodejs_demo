var Meetup = require('../models/meetup');

module.exports.create = function (req, res) {
  var meetup = new Meetup(req.body);
  meetup.name = req.body.name;
  meetup.age = req.body.age;
  meetup.save(function (err, result) {
        res.json(result);
  });
}

module.exports.list = function (req, res) {
  Meetup.find({}, function (err, results) {
      res.json(results);
  });
}
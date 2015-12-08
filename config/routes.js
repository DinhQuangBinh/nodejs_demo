var meetupsController = require('../server/controllers/meetups-controller');
var itemController = require('../server/controllers/items-controller');

module.exports=function(express,app,controllers){
    app.get('/', function (req, res) {
      res.sendfile('client/views/index.html');
    });

    app.use('/js', express.static(__dirname + '/client/js'));

    //REST API
    app.get('/api/meetups', meetupsController.list);
    app.post('/api/meetups', meetupsController.create);
    app.get('/api/item', itemController.list);
    app.post('/api/module', function(req, res) {
        var name = req.body.name;
        var image = req.body.image;
        var dateNow = new Date();
        var dd = dateNow.getDate();
        if (typeof name !== 'undefined' && name !== null && name !== '')
        {
            if (typeof image !== 'undefined' && image !== null && image !== '')
            {
                connection.query("insert into modules ('name','image') values ('"+name+"','"+name+"')",function(err,rows){
                if(err) throw err;
                    res.send('thêm dữ liệu thành công');
                });
            }
            else
                res.send('image không được rỗng');
        }
        else
            res.send('name không được rỗng');

    });

    app.get('/api/:version', function(req, res) {
        res.send(req.params.version);
      });

    app.post('/api/users', function(req, res) {
        var user_id = req.body.id;
        var token = req.body.token;
        var geo = req.body.geo;

        //res.json(req.headers);
        res.send(user_id + ' ' + token + ' ' + geo);
    });
}
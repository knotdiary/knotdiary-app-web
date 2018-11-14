var jsonServer = require('json-server');
var postConvertMiddleware = require('./middlewares/postConvert');

var server = jsonServer.create();
var router = jsonServer.router('./mock/api/db.json');
var middlewares = [postConvertMiddleware];
server.use(jsonServer.defaults);
server.use(router);
server.use(middlewares);

router.render = function (req, res) {
  res.jsonp(res.locals.data);
}

server.listen(8801);
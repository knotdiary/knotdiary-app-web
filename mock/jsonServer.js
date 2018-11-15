var jsonServer = require('json-server');

var server = jsonServer.create();
var router = jsonServer.router('./mock/api/db.json');
var middlewares = [];
server.use(jsonServer.defaults);
server.use(router);
server.use(middlewares);

router.render = function (req, res) {
  res.jsonp(res.locals.data);
}

server.listen(8801);
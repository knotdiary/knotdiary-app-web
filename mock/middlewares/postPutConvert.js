var postPutConvert = function(req, res, next) {
  if (req.method === 'POST' || req.method === 'PUT') {
    req.method = 'GET';
    req.query = req.body;
  }
  next();
};

module.exports = postPutConvert;

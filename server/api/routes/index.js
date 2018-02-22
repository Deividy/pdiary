function allowCrossDomain (req, res, next) {
  // cors! :x
  res.header('Access-Control-Allow-Origin', process.env.UI_ORIGIN);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Expose-Headers', 'Content-Type, Authorization');

  if ('OPTIONS' == req.method) return res.sendStatus(200);
  next();
}

module.exports = function (app) {
  app.use(allowCrossDomain);

  require('./user')(app);
  require('./diary')(app);

  app.use(function (req, res) {
    res.status(404).json({ notFound: true, code: 404 });
  });

  app.use(function (err, req, res) {
    const statusCode = err.statusCode || 500;

    if (statusCode === 500) console.error(err);
    res.status(statusCode).json({ error: true, code: statusCode, msg: err.msg });
  });
};


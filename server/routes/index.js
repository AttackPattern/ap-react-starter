module.exports = (app) => {
  if (process.env.NODE_ENV !== 'production') {
    app.use((req, res, next) => {
      res.header('X-Environment', process.env.NODE_ENV);
      return next();
    });
  }
  app.use('/',
    require('./healthcheck')
  );

  app.use( '/',
    require('./app')
  );
};

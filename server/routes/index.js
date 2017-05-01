module.exports = (app) => {
  if (app.locals.environment !== 'production') {
    app.use((req, res, next) => {
      res.header('X-Environment', app.locals.environment);
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

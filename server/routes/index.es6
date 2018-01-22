import Cookies from 'universal-cookie';
import { isEmpty } from 'lodash';

module.exports = (app, config) => {
  if (app.locals.environment !== 'production') {
    app.use((req, res, next) => {
      res.header('X-Environment', app.locals.environment);
      res.header('X-Robots-Tag', 'noindex');
      return next();
    });
  }

  app.use((req, res, next) => {
    const cookies = new Cookies(req.headers.cookie || '');
    const authCookie = cookies.get('logistics-auth');
    const auth = authCookie ? JSON.parse(new Buffer(authCookie, 'base64').toString()) : {};
    res.state = {
      ...res.state,
      app: {
        readUrl: config.urls.read,
        servicesUrl: config.urls.services,
      }
    };

    return next();
  });

  app.use('/',
    require('./healthcheck')
  );

  app.use('/',
    require('./app')
  );
};

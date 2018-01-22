const { Router } = require('express');

module.exports = Router()
  .get('/healthcheck', (req, res) => {
    res.type('txt').send('ENABLED: Site is ok');
  });

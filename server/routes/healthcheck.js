const express = require('express');

var router;
module.exports = router = express.Router();

router.get('/healthcheck', (req, res) => {
  res.type('txt').send('ENABLED: Site is ok');
});

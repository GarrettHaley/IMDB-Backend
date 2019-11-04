
const { error404 } = require('./../lib/auxiliary/errorObjects');
const { error500 } = require('./../lib/auxiliary/errorObjects');

/* 
 * The following routes provide the following functionality:
    1. Generate 500 and 404 status error responses as needed.
*/

const router = require('express').Router();

router.use('*', (err, req, res, next) => {
    console.error(err);
    res.status(500).send(error500);
  });
  
  router.use('*', function (req, res, next) {
    res.status(404).send(error404);
  });

  module.exports = router;
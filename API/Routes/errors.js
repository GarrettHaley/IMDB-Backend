/* 
 * The following routes provide the following functionality:
    1. Generate 500 and 404 status error responses as needed.
*/

const router = require('express').Router();

router.use('*', (err, req, res, next) => {
    console.error(err);
    res.status(500).send({
        "error": {
         "errors": [
          {
           "reason": "InternelServerError",
           "message": "An internel server error has occurredr"
          }
         ],
         "code": 500,
         "message": "Unable to access requested resource due to intenel server error."
         }
    });
  });
  
  router.use('*', function (req, res, next) {
    res.status(404).json({
        "error": {
         "errors": [
          {
           "reason": "notFound",
           "message": "Resource Not Found"
          }
         ],
         "code": 404,
         "message": "Unable to locate requested resource."
         }
    });
  });

  module.exports = router;
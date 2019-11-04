
const error500 = {
    "error": {
    "errors": [
      {
       "reason": "InternelServerError",
       "message": "An internel server error has occurred"
      }
    ],
     "code": 500,
     "message": "Unable to access requested resource due to intenel server error."
    }
};

const error404 = {
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
    }
  exports.error404 = error404;
  exports.error500 = error500;
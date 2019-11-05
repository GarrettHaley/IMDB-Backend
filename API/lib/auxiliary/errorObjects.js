
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

const error400 = {
  "error": {
  "errors": [
    {
     "reason": "Invalid request body",
     "message": "Your request could not be processed due to an invalid request body."
    }
  ],
   "code": 400,
   "message": "Unable to access requested resource due to an invalid request body."
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
  exports.error400 = error400;
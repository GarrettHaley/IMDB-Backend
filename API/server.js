/*
 * Express and body-parser are popular npm packages used for routing and parsing purposes.
 */

const express = require('express');
const app = express();
app.use(express.static('public'));

const bodyParser = require('body-parser');
app.use(bodyParser.json());

/* 
 * Defines the port which will be used by the server to host the api.
*/

const port = process.env.PORT || 8000;

/*
 * All routes for the API are written in modules in the routes/ directory.  The
 * top-level router lives in Routes/index.js.  That's what we include here, and
 * it provides all of the routes.
 */

//const api = require('./Routes');

//app.use('/', api);

app.use('*', (err, req, res, next) => {
  console.error(err);
  res.status(500).send({
    err: "A server error occurred.  Try again later."
  });
});

app.use('*', function (req, res, next) {
  res.status(404).json({
    error: "Requested resource " + req.originalUrl + " not found."
  });
});

app.listen(port, function() {
  console.log("== Server is running on port", port);
});
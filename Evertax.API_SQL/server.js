const express = require("express");
const cors = require("cors");
const app = express();
const bodyparser=require('body-parser');
const errorHandler = require('./app/_middleware/error-handle');

var corsOptions = {
  origin: "http://localhost:8080"
};

// app.use(cors(corsOptions));
app.use(cors());

// parse requests of content-type - application/json
app.use(bodyparser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));



app.use(express.json());

// api routes
app.use('api/member', require('./app/controllers/members/members.router'));
app.use('api/users', require('./app/controllers/users/users.service'));

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 8000;
app.listen(port, () => console.log('Server listening on port ' + port));
// set port, listen for requests


const express = require("express");
const cors = require("cors");
const memberRoute=require("./app/routes/member")
const app = express();
const bodyparser=require('body-parser');
const swaggerUI =require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');


var corsOptions = {
  origin: "http://localhost:8080"
};
const { swaggerServe, swaggerSetup } = require('./app/config/swagger.config')
app.use("/api/v1", swaggerServe, swaggerSetup); 
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyparser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


app.use("/api/member", memberRoute);


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

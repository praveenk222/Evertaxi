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
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Ever Taxi API",
      version: "1.0.0",
      description: "ever tax apis",
      termsOfService: "http://example.com/terms/",
      contact: {
        name: "API Support",
        url: "http://www.exmaple.com/support",
        email: "support@example.com",
      },
    },

    servers: [
      {
        api: "http://localhost:8080",
        description: "Ever Tax API Documentation",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsDoc(options);
app.use("/api/v1", swaggerUI.serve, swaggerUI.setup(specs));

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyparser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


app.use("/api", memberRoute);


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

const express = require("express");
const cors = require("cors");
const memberRoute=require("./app/controllers/MembersNewSQL/member.router");
const productRoute=require("./app/controllers/ProductMaster/products.router");
const orderRoute=require("./app/controllers/Orders/orders.router");
const app = express();
const bodyparser=require('body-parser');

var corsOptions = {
  origin: "http://localhost:8080"
};

// app.use(cors(corsOptions));
app.use(cors());

// parse requests of content-type - application/json
app.use(bodyparser.json({ limit: "50mb" }));
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


app.use("/api", memberRoute);
app.use("/api", productRoute);
app.use("/api", orderRoute);


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
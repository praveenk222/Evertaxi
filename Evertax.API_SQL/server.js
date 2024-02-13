const express = require("express");
const cors = require("cors");
const memberRoute=require("./app/controllers/MembersNewSQL/member.router");
const productRoute=require("./app/controllers/ProductMaster/products.router");
const orderRoute=require("./app/controllers/Orders/orders.router");
const app = express();
const bodyparser=require('body-parser');
const az_upload =require('./app/controllers/azure_fileupload/az_upload.service');
const hubroute=require('./app/controllers/Bike_hubs/bikehubs.router');
const documntroute=require('./app/controllers/DocumentsSave/document.router');
const adminroute=require('./app/controllers/admin/Admin/admin.router')

///webAdmin APIS
const hubs_product=require('./app/adminWebController/ProductManagment/productsManagment.router')
const admin_customers=require('./app/adminWebController/members/customers.router')
const admin_orders=require('./app/adminWebController/OrderManagment/ordermanagment.router')
const admin_counts=require('./app/adminWebController/AdminCounts/admincount.router')

var corsOptions = {
  origin: "*"
};

// app.use(cors(corsOptions));
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyparser.json({ limit: "50mb" }));
// app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


app.use("/api", memberRoute);
app.use("/api/product", productRoute);
app.use("/api/orders", orderRoute);
app.use("/api/hubs", hubroute);
app.use("/api/upload", az_upload);
app.use("/api/documents", documntroute);
app.use("/api/admin", adminroute);

//web admin routes

app.use("/api/v1/adminweb/customers", admin_customers);
app.use("/api/v1/adminweb/orders", admin_orders);
app.use("/api/v1/adminweb/products", hubs_product);
app.use("/api/v1/adminweb/counts", admin_counts);




// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

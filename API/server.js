const express = require("express");
const cors = require("cors");
const memberRoute=require("./app/routes/member")
const app = express();
const bodyparser=require('body-parser');
const swaggerUI =require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const multer = require('multer')
const path = require('path')
var corsOptions = {
  origin: "http://localhost:8080"
};
const { swaggerServe, swaggerSetup } = require('./app/config/swagger.config')
app.use(express.urlencoded({ extended: true }));

  const storage =multer.diskStorage({
    destination:(req,file,cb) =>{
      cb(null,'Images')},
    finlename:(req,file,cb) =>{
      
      cb(null,Date.now()+ path.extname(file.originalname)+'.jpeg')
      }
    });
  const upload = multer({storage:storage})

app.use("/api/v1", swaggerServe, swaggerSetup); 
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyparser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use("/upload",upload.single("image"),(req,res)=>{
  res.send("image upload")
})

app.use("/api/member", memberRoute);


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

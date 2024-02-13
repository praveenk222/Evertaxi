var  express = require('express');
const fs=require('fs');
var  router = express.Router();
var  Db = require('../AdminCounts/admincount.service');


router.use((request, response, next) => {
    next();
  });
router.route('/').get((request, response) => {
  try {
    let id=request.params.id;
    
    Db.getHubWisebooking().then((data) => {
      response.json({"id":1,"status":true,"message":data});
    })
  } catch (error) {
    response.json({"id":0,"status":false,"message":'dfdf'})
  }
   
  })
  
 router.route('/get').get((req,res)=>{
  try {
    
    Db.getHubWisebooking().then((data)=>{
console.log(data)
      res.json(data)
    })
  } catch (error) {
    return error
  }
 })
 




module.exports = router;

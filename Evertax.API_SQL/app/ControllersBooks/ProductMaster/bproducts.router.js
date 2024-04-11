var  express = require('express');
const fs=require('fs');
var  router = express.Router();
var  Db = require('./products.service');


router.use((request, response, next) => {
    next();
  });
router.route('/get').get((request, response) => {
    Db.getBookProudcts().then((data) => {
      response.json(data[0]);
    })
  })

  
  router.route('/get/:id').get((request, response) => {
    console.log(request.params.id)
    Db.getProduct(request.params.id).then((data) => {
      response.json(data);
    })
  })
  

  


    

module.exports = router;

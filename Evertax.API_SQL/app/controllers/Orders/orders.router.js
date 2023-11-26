var  express = require('express');
const fs=require('fs');
var  router = express.Router();
var  Db = require('../Orders/orders.service');


router.use((request, response, next) => {
    next();
  });
router.route('/orders').get((request, response) => {
    Db.getOrders().then((data) => {
      response.json(data[0]);
    })
  })
  
 
    

module.exports = router;

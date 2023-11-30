var  express = require('express');
const fs=require('fs');
var  router = express.Router();
var  Db = require('../ProductMaster/products.service');


router.use((request, response, next) => {
    next();
  });
router.route('/get').get((request, response) => {
    Db.getProducts().then((data) => {
      response.json(data[0]);
    })
  })
  
  router.route('/get/:id').get((request, response) => {
    console.log(request.params.id)
    Db.getMember(request.params.id).then((data) => {
      response.json(data[0][0]);
    })
  })
  
  router.route('/products').post((request, response) => {
    let  member = { ...request.body }
    Db.addMember(member).then(data  => {
      response.status(201).json(data);
    })
  })
    

module.exports = router;

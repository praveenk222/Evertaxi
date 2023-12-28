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
router.route('/getPriceData').get((request, response) => {
    Db.getProductTime().then((data) => {
      response.status(200).json(data[0]);
    })
  })
  
  router.route('/get/:id').get((request, response) => {
    console.log(request.params.id)
    Db.getProductByID(request.params.id).then((data) => {
      response.json(data);
    })
  })
  
  router.route('/bybranch').post((request, response) => {
    Db.getProductByBranchID(request.body).then((data) => {
      response.status(200).json(data);
    })
  })
  
  router.route('/products').post((request, response) => {
    let  member = { ...request.body }
    Db.addMember(member).then(data  => {
      response.status(201).json(data);
    })
  })
  router.route('/search').post((request, response) => {
    let  member = { ...request.body }
    Db.searchProduct(member).then(data  => {
      response.status(200).json(data);
    })
  })

    

module.exports = router;

var  express = require('express');
const fs=require('fs');
var  router = express.Router();
var  Db = require('./admin.service');


router.use((request, response, next) => {
    next();
  });
router.route('/getoffers').get((request, response) => {
    Db.getoffers().then((data) => {
      response.json(data[0]);
    })
  })
router.route('/getcoupns').get((request, response) => {
    Db.getcoupns().then((data) => {
      response.json(data[0]);
    })
  })
router.route('/offers/getall').get((request, response) => {
    Db.getAlloffersndcoupns().then((data) => {
      response.json(data[0]);
    })
  })

  
  router.route('/offerbyuserid/:id').get((request, response) => {
    Db.getoffersndcoupnsByuserID(request.params.id).then((data) => {
      response.json(data);
    })
  })

  
 
  
  router.route('/offers/save').post((request, response) => {
    let  payload = { ...request.body }
    Db.addoffersndcoupns(payload).then(data  => {
      response.status(201).json(data);
    })
  })
  router.route('/promocode/save').post((request, response) => {
    let  payload = { ...request.body }
    Db.addoffersnew(payload).then(data  => {      
      response.status(201).json(data);
    })
  })
  router.route('/promocode/remove').post((request, response) => {
    let  payload = { ...request.body }
    Db.removeoffers(payload).then(data  => {      
      response.status(200).json(data);
    })
  })
  router.route('/promocode/update').post((request, response) => {
    let  payload = { ...request.body }
    Db.updateoffers(payload).then(data  => {      
      response.status(201).json(data);
    })
  })
  router.route('/questions').get((request, response) => {
    Db.getquestions().then(data  => {
      response.status(200).json(data);
    })
  })

  router.route('/offers/search').post((request, response) => {
    let  payload = { ...request.body }
    Db.getOffersSearch(payload).then(data  => {
      response.status(200).json(data);
    })
  })

module.exports = router;

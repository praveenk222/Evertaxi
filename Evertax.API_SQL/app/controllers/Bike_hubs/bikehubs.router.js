var  express = require('express');
const fs=require('fs');
var  router = express.Router();
var  Db = require('../Bike_hubs/bikehubs.service');


router.use((request, response, next) => {
    next();
  });
router.route('/get').get((request, response) => {
    Db.getHubs().then((data) => {
      response.json(data[0]);
    })
  })
  
  router.route('/get/:id').get((request, response) => {
    console.log(request.params.id)
    Db.getHubsByID(request.params.id).then((data) => {
      response.json(data);
    })
  })
  router.route('/gethubdetails/:id').get((request, response) => {
    console.log(request.params.id)
    Db.getHubDetailsByID(request.params.id).then((data) => {
      response.status(200).json(data);
    })
  })
  
  router.route('/save').post((request, response) => {
    let  member = { ...request.body }
    Db.addMember(member).then(data  => {
      response.status(201).json(data);
    })
  })
  router.route('/getnearByHubsList').post((request, response) => {
    let  hubs = { ...request.body }
    Db.getHubsByLatandLong(hubs).then(data  => {
      response.status(200).json(data);
    })
  })
    

module.exports = router;

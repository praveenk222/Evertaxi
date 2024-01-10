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
  
  router.route('/get').post((request, response) => {
    Db.getHubsByID(request.body).then((data) => {
      response.status(200).json(data);
    })
  })
  router.route('/gethubdetails/:id').get((request, response) => {
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
  router.route('/getnearByHubsListSearch').post((request, response) => {
    let  hubs = { ...request.body }
    Db.getHubsByLatandLong_Search(hubs).then(data  => {
      response.status(200).json(data);
    })
  })
  router.route('/getdetailsByPIDnHbID').post((request, response) => {
    let  hubs = { ...request.body }
    console.log(hubs)
    Db.getHubDetailsByPID_HubID(hubs).then(data  => {
      response.status(200).json(data);
    })
  })
    

module.exports = router;

var  express = require('express');
const fs=require('fs');
var  router = express.Router();
var  Db = require('./products.service');


router.use((request, response, next) => {
    next();
  });
router.route('/get').get((request, response) => {
  
  try {
    Db.getBookProudcts().then((data) => {
      response.json({ "id": 1, "status": true, "message": data[0] });

    })
  } catch (error) {
    response.json({ "id": 1, "status": true, "message": error });
  }
})
  
  router.route('/get/:id').get((request, response) => {
    console.log(request.params.id)
    Db.getProduct(request.params.id).then((data) => {
      response.json(data);
    })
  })
  

  


    

module.exports = router;

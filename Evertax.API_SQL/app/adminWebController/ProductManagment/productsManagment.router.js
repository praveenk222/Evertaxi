var express = require('express');
const fs = require('fs');
var router = express.Router();
var Db = require('../ProductManagment/productsManagment.service');


router.use((request, response, next) => {
  next();
});
router.route('/').post((request, response) => {
  try {
    Db.getProducts(request.body).then((data) => {
      response.json({ "id": 1, "status": true, "message": data });

    })
  } catch (error) {
    response.json({ "id": 1, "status": true, "message": error });
  }

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
router.route('/gethubs').get((request, response) => {
  try {
    Db.getHubs().then((data) => {
      response.json({ "id": 1, "status": true, "message": data });

    })
  } catch (error) {
    response.json({ "id": 1, "status": true, "message": error });
  }

})
router.route('/getLookup').get((request, response) => {
  try {
    Db.getConfigList().then((data) => {
      response.json({ "id": 1, "status": true, "message": data });

    })
  } catch (error) {
    response.json({ "id": 1, "status": true, "message": error });
  }

})

router.route('/bybranch').post((request, response) => {
  Db.getProductByBranchID(request.body).then((data) => {
    response.status(200).json(data);
  })
})

router.route('/save').post((request, response) => {
  let member = { ...request.body }
  try {

    Db.addProduct(member).then(data => {
      if (!response.headersSent) {

        if (!data.status) {
          response.status(500).json(data)

        } else {

          response.status(201).json(data);
        }
      }
    })
  } catch (error) {
    response.status(500).json(error)

  }
})
router.route('/savehub').post((request, response) => {
  let member = { ...request.body }
  try {

    Db.addHub(member).then(data => {
      if (!response.headersSent) {

        if (!data.status) {
          response.status(500).json(data)

        } else {

          response.status(201).json(data);

        }
      }
    })
  } catch (error) {
    response.status(500).json(data)


  }
})
router.route('/search').post((request, response) => {
  let member = { ...request.body }
  Db.searchProduct(member).then(data => {
    response.status(200).json(data);
  })
})



module.exports = router;

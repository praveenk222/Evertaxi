var express = require('express');
var router = express.Router();
var Db = require('../DocumentsSave/document.service');

router.use((request, response, next) => {
  next();
});
router.route('/save').post((request, response) => {
  let reqbody = { ...request.body }
  Db.adddocument(reqbody).then(data => {
    response.status(201).json(data);
  },
    (error) => {
      response.status(500).json({ "Status": "true", "message": error.message })
    }
  )
})



router.route('/:id').get((req, res) => {
  console.log(req.params.id)
  Db.getdocumentbyuserid(req.params.id).then((data) => {
    res.status(200).json({ "Status": "true", "message": data })
  }, error => {
    res.status(500).json({ "Status": "false", "message": error.message })
  }
  )
})

router.route('/iskyc/:id').get((req, res) => {
  console.log(req.params.id)
  Db.checkkyc(req.params.id).then((data) => {
    res.status(200).json({ "IsSuccess": "true", "message": data })
  }, error => {
    res.status(500).json({ "IsSuccess": "false", "message": error.message })
  }
  )
})
router.route('/all').get((req, res) => {
  console.log(req.params.id)
  Db.getdocuments().then((data) => {
    res.status(200).json({ "Status": "true", "message": data })
  }, error => {
    res.status(500).json({ "Status": "false", "message": error.message })
  }
  )
})
router.route('/delete/:id').get((req, res) => {
  console.log(req.params.id)
  Db.removedocumentbyuserid(req.params.id).then((data) => {
    res.status(200).json(data)
  }, error => {
    res.status(500).json({ "Status": "true", "message": error.message })
  }
  )
})


module.exports = router;

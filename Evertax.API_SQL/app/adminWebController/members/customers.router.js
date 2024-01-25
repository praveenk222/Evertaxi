var express = require('express');
const fs = require('fs');
var router = express.Router();
var Db = require('../members/customers.service');
var PostResult=require('../../Models/postresult.model')


router.use((request, response, next) => {
  // console.log('middleware');
  next();
});




router.route('/').get((request, response) => {
  Db.getMembers().then(data => {
    response.status(200).json(data);
  })
})
router.route('/addAdminUser').post((request, response) => {
  let member = { ...request.body }
  console.log(member)
  Db.addSecuirtyUser(member).then(data => {
    response.status(201).json(data);

  })
})
router.route('/adminLogin').post((request, response) => {
  let member = { ...request.body }
  console.log(member)
  Db.SecurityUserLogin(member).then(data => {
    response.status(201).json(data);

  })
})
// need to change error message in sp for wrong data



router.route('/getsecurityusers/:id').get((req, res) => {
  Db.getsecuirtyUsers(req.params.id).then(data =>
     { res.status(200).json(data) }
     )
})

router.route('/updateUserKycStatus').post((req, res) => {
  Db.updateuserKyc(req.body).then(data => { res.status(200).json(data) })
})
router.route('/saveUserRole').post((req, res) => {
  Db.saveUserRole(req.body).then(data => { res.status(200).json(data) })
})
router.route('/saveUserAddress').post((req, res) => {
  Db.addUserAddress(req.body).then(data => { res.status(200).json(data) })
})


router.route('/gettrustedcontacts/:id').get((req, res) => {
  console.log(req.params.id)
  Db.getTrustedMembers(req.params.id).then(data => { res.status(200).json(data) })
})


module.exports = router;

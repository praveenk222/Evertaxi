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
    response.status(200).json({'id':1,'status':true,'message':data});
  },(error=>{
    response.status(500).json({'id':0,'status':false,'message':error.message})
  })
  )
})
router.route('/addAdminUser').post((request, response) => {
  let member = { ...request.body }
  console.log(member)
  Db.addSecuirtyUser(member).then(data => {
    response.status(201).json(data);

  })
})
router.route('/savenotification').post((request, response) => {
  let member = { ...request.body }
  Db.saveNotification(member).then(data => {
    response.status(201).json(data);

  })
})
router.route('/deleteNotification/:id').get((request, response) => {
  Db.removeNotification(request.params.id).then(data => {
    response.status(201).json(data);

  })
})
router.route('/adminLogin').post((request, response) => {
  let member = { ...request.body }
  console.log(member)
  Db.SecurityUserLogin(member).then(data => {
    console.log(data)
    response.status(200).json(data);

  })
})
// need to change error message in sp for wrong data



router.route('/getsecurityusers/:id').get((req, res) => {
  Db.getsecuirtyUsers(req.params.id).then(data =>
     { res.status(200).json(data) }
     )
})
router.route('/getnotification').get((req, res) => {
  Db.getNotification().then(data =>
     { res.status(200).json(data) }
     )
})
router.route('/getAdminUserList').get((req, res) => {
  Db.getAdminUserList().then(data =>
     { res.status(200).json({status:true,id:0,message:data}) }
     )
})

router.route('/adComplains').post((req, res) => {
  Db.adComplains(req.body).then(data => { res.status(200).json(data) })
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
router.route('/getLeftNavbarByID/:id').get((req, res) => {
  console.log(req.params.id)
  Db.getLeftNavbarByID(req.params.id).then(data => { res.status(200).json(data) })
})
router.route('/getLeftnavbar').get((req, res) => {
  Db.getLeftnavbar().then(data => { res.status(200).json(data) })
})
router.route('/getDashboardData').get((req, res) => {
  Db.getDashboardData().then(data => { res.status(200).json(data) })
})
router.route('/getPriceList').get((req, res) => {
  Db.getPriceList().then(data => { res.status(200).json({status:true,message:data}) })
})
router.route('/saveUserTabAccess').post((req, res) => {
  Db.saveTabAccess(req.body).then(data => { res.status(200).json(data) })
})
router.route('/savePriceData').post((req, res) => {
  Db.savePriceData(req.body).then(data => { res.status(200).json(data) })
})


module.exports = router;

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
  Db.getMembers().then((data) => {
    
    response.json({'id':1,'status':true,'message':data[0]});
  })
})

router.route('/members/:id').get((request, response) => {
  console.log(request.params.id)
  Db.getMember(request.params.id).then((data) => {
    response.json(data[0][0]);
  })
})

router.route('/members').post((request, response) => {
  let member = { ...request.body }
  console.log(member)
  Db.addMember(member).then(data => {
    response.status(201).json(data);
  })
})
router.route('/addAdminUser').post((request, response) => {
  let member = { ...request.body }
  console.log(member)
  Db.addSecuirtyUser(member).then(data => {
    response.status(201).json(data);

  })
})
// need to change error message in sp for wrong data
router.route('/member/Login').post((request, response) => {
  let member = { ...request.body }
  Db.memberLogin(member).then(data => {
    response.status(200).json(data);
  })
})
router.route('/geee').post((req, res) => {
  var data = { ...req.body }

  function decodeBase64Image(dataString) {
    var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
      response = {};

    if (matches.length !== 3) {
      return new Error('Invalid input string');
    }

    response.type = matches[1];
    response.data = new Buffer.from(matches[2], 'base64');

    return response;
  }

  var imageBuffer = decodeBase64Image(data.img);
  fs.writeFile('test.jpg', imageBuffer.data, function (err) {
    console.log(err)
  });
  console.log(imageBuffer);
})

router.route('/getbymobileno/:number').get((req, res) => {
  console.log(req.params.number)
  let data = req.params.number;
  Db.getlistbymobileno(data).then(data => {
    res.status(200).json(data);
  })
})
router.route('/getCredentials').get((req, res) => {
  Db.getCredentials().then(data => {
    res.status(200).json(data);
  })
})
router.route('/updateUserKycStatus').post((req, res) => {
  Db.updateuserKyc(req.body).then(data => { res.status(200).json(data) })
})
router.route('/setUserPin').post((req, res) => {
  Db.saveUserSecurityPin(req.body).then(data => { res.status(200).json(data) })
})
router.route('/saveUserAddress').post((req, res) => {
  Db.addUserAddress(req.body).then(data => { res.status(200).json(data) })
})
router.route('/getaddress/:id').get((req, res) => {
  console.log(req.params.id)
  Db.getuseraddressbyID(req.params.id).then(data => { res.status(200).json(data) })
})
router.route('/getAddressByAdID/:id').get((req, res) => {
  console.log(req.params.id)
  Db.getAddressByAdID(req.params.id).then(data => { res.status(200).json(data) })
})
router.route('/deleteUseraddress').post((req, res) => {
  Db.deleteUserAddress(req.body).then(data => { res.status(200).json(data) })
})
router.route('/saveTrustedContacts').post((req, res) => {
  Db.saveTrustedContacts(req.body).then(data => 
    { res.status(200).json(data) },
    (error)=>{res.status(500).json(error)}
  )
})
router.route('/removeUser').post((req, res) => {
  Db.removeUser(req.body).then(data => 
    { res.status(200).json(data) },
    (error)=>{res.status(500).json(error)}
  )
})
router.route('/gettrustedcontacts/:id').get((req, res) => {
  console.log(req.params.id)
  Db.getTrustedMembers(req.params.id).then(data => { res.status(200).json(data) })
})
router.route('/checkUserActions/:id').get((req, res) => {
  console.log(req.params.id)
  Db.CheckUserActions(req.params.id).then(data => { res.status(200).json(data) })
})

module.exports = router;

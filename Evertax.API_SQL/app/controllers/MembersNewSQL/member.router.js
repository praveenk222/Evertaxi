var  express = require('express');

var  router = express.Router();
var  Db = require('../MembersNewSQL/members.service');


router.use((request, response, next) => {
    // console.log('middleware');
    next();
  });
router.route('/members').get((request, response) => {
    Db.getMembers().then((data) => {
      response.json(data[0]);
    })
  })
  
  router.route('/members/:id').get((request, response) => {
    console.log(request.params.id)
    Db.getMember(request.params.id).then((data) => {
      response.json(data[0][0]);
    })
  })
  
  router.route('/members').post((request, response) => {
    let  member = { ...request.body }
    Db.addMember(member).then(data  => {
      response.status(201).json(data);
    })
  })
    // need to change error message in sp for wrong data
  router.route('/member/Login').post((request, response) => {
    let  member = { ...request.body }
    Db.memberLogin(member).then(data  => {
      response.status(200).json(data);
    })
  })
    

module.exports = router;

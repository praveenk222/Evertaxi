var  express = require('express');
const fs=require('fs');
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
    console.log(member)
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
    router.route('/geee').post((req,res)=>{
      var data={...req.body}

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
        fs.writeFile('test.jpg', imageBuffer.data, function(err) {
          console.log(err)
         });
        console.log(imageBuffer);
    })
    router.route('/sendsms').post((request, res)=>{
      let  data = {...request.body }
      Db.sendsms(request.body).then(
        data=>{
         res.status(200).json(data)
        })
    })
    router.route('/getbymobileno/:number').get((req,res)=>{
      console.log(req.params.number)
       let data=req.params.number;
      Db.getlistbymobileno(data).then(data =>{
        res.status(200).json(data);
      })
    })
    router.route('/getCredentials').get((req,res)=>{
      Db.getCredentials().then(data =>{
        res.status(200).json(data);
      })
    })

  
module.exports = router;

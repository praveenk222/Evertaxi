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
      console.log('eer',request.body)
      Db.sendsms(request.body).then(
        data=>{
         res.status(200).json(data)
        }
      )

    })

    router.post('/', uploadStrategy, (req, res) => {
      console.log(req)
      // process.env.AZURE_STORAGE_CONNECTION_STRING
let string="DefaultEndpointsProtocol=https;AccountName=everdevuat;AccountKey=Pd6/mFhr8WXcAYeuKh49AHgiv+Ug+HOb+sEqCOPO7AWZaswduyJttDGYXYR1fszD0SQAjigQgvxv+AStLmJycg==;EndpointSuffix=core.windows.net"
let containerName="everdevuat"   ;
const
            blobName = getBlobName(req.file.originalname)
          , blobService = new BlockBlobClient(string,containerName,blobName)
          , stream = getStream(req.file.buffer)
          , streamLength = req.file.buffer.length
      ;
  console.log(blobName)
      blobService.uploadStream(stream, streamLength)
      .then(
          ()=>{
              res.render('success', { 
                  message: 'File uploaded to Azure Blob storage.' 
              });
          }
      ).catch(
          (err)=>{
          if(err) {
              handleError(err);
              return;
          }
      })
  });
module.exports = router;

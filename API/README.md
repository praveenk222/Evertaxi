
1.to run : node server.js

2. swagger in nodejs link https://www.youtube.com/watch?v=czYEVPlqEyI
.https://github.com/codeimprove0/node-swagger/blob/master/readme.txt
read it .
3. after uploading the file we get below json object.
{
  fieldname: 'uploaded_file',
  originalname: 'auth-logo-dark.png',
  encoding: '7bit',
  mimetype: 'image/png',
  destination: 'uploads/',
  filename: '39a85395ac4c7d34534279c6f62b99a1',
  path: 'uploads\\39a85395ac4c7d34534279c6f62b99a1',
  size: 1939
} [Object: null prototype] { test: '' }

5. file upload
https://medium.com/geekculture/file-upload-and-download-in-node-js-c524a8050c8f
4. using multer
herer in member js i have written suceesfully code based on below ex..
https://www.npmjs.com/package/multer

<form action="/profile" method="post" enctype="multipart/form-data">
  <input type="file" class="form-control-file" name="uploaded_file">
</form>
same file name should use..


const express = require('express')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const app = express()

app.post('/profile', upload.single('avatar'), function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
})

app.post('/photos/upload', upload.array('photos', 12), function (req, res, next) {
  // req.files is array of `photos` files
  // req.body will contain the text fields, if there were any
})

const cpUpload = upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 8 }])
app.post('/cool-profile', cpUpload, function (req, res, next) {
  // req.files is an object (String -> Array) where fieldname is the key, and the value is array of files
  //
  // e.g.
  //  req.files['avatar'][0] -> File
  //  req.files['gallery'] -> Array
  //
  // req.body will contain the text fields, if there were any
})


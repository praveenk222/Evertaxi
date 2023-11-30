// routes.js
const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// Use body-parser middleware to parse JSON data
router.use(bodyParser.json());

// Set up Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Create a folder based on a key in the JSON data
    console.log('req.body:', file); // Log the entire request body
//   console.log('req.files:', req.files); 
   // Determine folder based on filename
   let folder;
   if (file.originalname.includes('voter')) {
     folder = 'voter';
   } else if (file.originalname.includes('adhar')) {
     folder = 'adhar';
   
   } else if (file.originalname.includes('driving')) {
     folder = 'drivingL';
   } 
   else {
     folder = 'defaultFolder';
   }
    const uploadPath = path.join('uploads', folderName);

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {

    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Define a route to handle file and JSON data uploads
router.post('/upload', upload.fields([{ name: 'file', maxCount: 1 }, { name: 'jsonData' }]), (req, res) => {
  // Log the uploaded files
  const jsonData = req.body['jsonData'] || '{}';
  const parsedJsonData = JSON.parse(jsonData);

  // Handle the uploaded file and JSON data
  // Access file details from the 'files' array and JSON data from 'parsedJsonData'
  
  res.send('File and JSON data uploaded successfully!');
});

module.exports = router;

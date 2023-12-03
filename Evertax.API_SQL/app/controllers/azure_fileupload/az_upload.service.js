const express = require('express');
const multer = require('multer');
const { BlobServiceClient } = require('@azure/storage-blob');
const path = require('path');
const fs = require('fs');
var  router = express.Router();
// route.js




// Update these variables with your Azure Storage account details
const connectionString = 'DefaultEndpointsProtocol=https;AccountName=everdevuat;AccountKey=Pd6/mFhr8WXcAYeuKh49AHgiv+Ug+HOb+sEqCOPO7AWZaswduyJttDGYXYR1fszD0SQAjigQgvxv+AStLmJycg==;EndpointSuffix=core.windows.net';
const containerName = 'webadmin';


// Set up multer to handle file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


router.get('/create',async (req,res)=>{
  let data={...req.body}
  // check key name
  const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
  const create=blobServiceClient.createContainer(data)
  console.log(create)
})
// Handle file uploads
router.post('/', upload.single('file'), async (req, res) => {
  const file = req.file;
  console.log(req)
  if (!file) {
    return res.status(400).send('No file uploaded.');
  }  
  const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString,'hubs');
  const containerClient = blobServiceClient.getContainerClient();
  const blobName = file.originalname;
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  try {
    await blockBlobClient.upload(file.buffer, file.size);
    return res.status(200).send('File uploaded successfully.');
  } catch (error) {
    console.error('Error uploading file to Azure Blob Storage:', error.message);
    return res.status(500).send('Internal Server Error.');
  }
});

module.exports = router;

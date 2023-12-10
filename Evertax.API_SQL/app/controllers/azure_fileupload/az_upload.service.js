const express = require('express');
const multer = require('multer');
const { BlobServiceClient } = require('@azure/storage-blob');
const path = require('path');
const fs = require('fs');
var  router = express.Router();
// route.js




// Update these variables with your Azure Storage account details
const connectionString = 'DefaultEndpointsProtocol=https;AccountName=everdevuat;AccountKey=Pd6/mFhr8WXcAYeuKh49AHgiv+Ug+HOb+sEqCOPO7AWZaswduyJttDGYXYR1fszD0SQAjigQgvxv+AStLmJycg==;EndpointSuffix=core.windows.net';
// const containerName = 'webadmin';
const containerName = 'hubs';


// Set up multer to handle file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);


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
 
  if (!file) {
    return res.status(400).send('No file uploaded.');
  }  
  const containerClient = blobServiceClient.getContainerClient(containerName);

  const blobName =  file.originalname;
  // const blobName = 'test' + '123' + file.originalname;
  const filePath = file.path;
  console.log(blobName)
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  // Display blob name and url

console.log(
  `\nUploading to Azure storage as blob\n\tname: ${blobName}:\n\tURL: ${blockBlobClient.url}`
);

  try {
    const filePath = file.path
    await blockBlobClient.upload(file.buffer, file.size);
    // await blockBlobClient.uploadFile(file.path.file.si);
  console.log(`File "${blobName}" uploaded successfully. ETag: ${uploadBlobResponse.etag}`);

    console.log(
      `Blob was uploaded successfully. requestId: ${uploadBlobResponse.requestId}`
    );
    return res.status(200).send('File uploaded successfully.');
  } catch (error) {
    console.error('Error uploading file to Azure Blob Storage:', error.message);
    return res.status(500).send('Internal Server Error.');
  }
});

router.post('/upload', upload.single('file'), async (req, res) => {
  const file = req.file;
  const blobName = file.originalname;

  try {
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    // Upload the file
    const uploadBlobResponse = await blockBlobClient.upload(file.buffer, file.size);

    console.log(`File "${blobName}" uploaded successfully. ETag: ${uploadBlobResponse.etag}`);
    res.send('File uploaded successfully.');
  } catch (error) {
    console.error(`Error uploading file: ${error.message}`);
    res.status(500).send('Internal Server Error');
  }
});
router.post('/voter',upload.single('file'),async(req,res)=>{
  const file =req.file;
  const blobName =file.originalname;
  const containerName='voter';
  try{
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    const uploadBlobResponse = await blockBlobClient.upload(file.buffer,file.size);
    console.log(`File "${blobName}" uploaded successfully. ETag: ${uploadBlobResponse.etag}`);

    res.status(200).send('File uploaded successfully');
  
  }
  catch(error){
  console.error('Error uploading file')
  res.status(500).send('internal server error');
  }
  });
  
router.post('/adhar',upload.single('file'),async(req,res)=>{
  const file =req.file;
  const blobName =file.originalname;
  const containerName='adhar';
  try{
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    const uploadBlobResponse = await blockBlobClient.upload(file.buffer,file.size);
    console.log(`File "${blobName}" uploaded successfully. ETag: ${uploadBlobResponse.etag}`);

    res.status(200).send('File uploaded successfully');
  
  }
  catch(error){
  console.error('Error uploading file')
  res.status(500).send('internal server error');
  }
  });
  
router.post('/licence',upload.single('file'),async(req,res)=>{
  const file =req.file;
  const blobName =file.originalname;
  const containerName='licence';
  try{
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    const uploadBlobResponse = await blockBlobClient.upload(file.buffer,file.size);
    console.log(`File "${blobName}" uploaded successfully. ETag: ${uploadBlobResponse.etag}`);

    res.status(200).send('File uploaded successfully');
  
  }
  catch(error){
  console.error('Error uploading file')
  res.status(500).send('internal server error');
  }
  });
  
  
  
router.get('/getblobs',async (req,res)=> {

  const containerClient = blobServiceClient.getContainerClient(containerName);

  let i = 1;
  let blobs = containerClient.listBlobsFlat();
  for await (const blob of blobs) {
    console.log(`Blob ${i++}: ${blob.name}`);
  }
});
router.get('/getcontainer',async (req,res)=> {
  for await (const response of blobServiceClient.listContainers().byPage({
    maxPageSize: 20,
  })) {
    console.log("- Page:");
    if (response.containerItems) {
      for (const container of response.containerItems) {
        console.log(`  - ${container.name}`);
      }
    }
  }

});

module.exports = router;

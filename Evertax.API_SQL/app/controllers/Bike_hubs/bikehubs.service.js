var  config = require('../../config/db.config');
const  sql = require('mssql');

async  function  getHubs() {
  try {
    let  pool = await  sql.connect(config);
    let  Hubs = await  pool.request().query("SELECT *   FROM evertaxi.Hubmaster  ");
    return  Hubs.recordsets;
  }
  catch (error) {
    console.log(error);
  }
}

async  function  getHub(HubId) {
  try {
    console.log(HubId)
    let  pool = await  sql.connect(config);
    let  Hub = await  pool.request()
    .input('input_parameter', sql.Int, HubId)
    .query("SELECT * from operation.member where userid = @input_parameter");
    return  Hub.recordsets;
  }
  catch (error) {
    console.log(error);
  }
}
async  function  getHubByID(branchTypeID) {
  try {
    let  pool = await  sql.connect(config);
    let  record = await  pool.request()
    .input('input_parameter', sql.SmallInt, branchTypeID)
    .execute('usp_getHubsList');
    return  record.recordsets;
  }
  catch (error) {
    console.log(error);
  }
}

async  function  addHub(Member) {
  try {
    let  pool = await  sql.connect(config);
    let  insertHub = await  pool.request()
    .input('UserID', sql.Int, Member.UserID)
    .input('Title', sql.NVarChar, Member.Title)
    .input('Quantity', sql.Int, Member.Quantity)
    .input('Message', sql.NVarChar, Member.Message)
    .input('City', sql.NVarChar, Member.City)
    .execute('InsertMembers');
    return  insertHub.recordsets;
  }
  catch (err) {
    console.log(err);
  }
}
async  function  getHubs() {
  try {
    let  pool = await  sql.connect(config);
    let  insertHub = await  pool.request()   
    .execute('usp_getHubsList');
    return  insertHub.recordsets;
  }
  catch (err) {
    console.log(err);
  }
}
async  function  getHubsByID(data) {
  try {
    console.log(data)
    let  pool = await  sql.connect(config);
    let  insertHub = await  pool.request()
    .input('branchtypeID',data.branchtypeID)   
    .input('branchname',data.branchname)   
    .execute(`usp_getBranchsListByID`);
    return  insertHub.recordsets[0];
  }
  catch (err) {
    console.log(err);
  }
}
async  function  getHubsByLatandLong(data) {
  try {
    let  pool = await  sql.connect(config);
    let  insertHub = await  pool.request()
    .input('TargetLatitude',data.TargetLatitude)   
    .input('TargetLongitude',data.TargetLongitude)   
    .input('branchtype',data.branchtype)   
    .input('RadiusInKm',data.RadiusInKm)   
    .execute(`usp_Get_NearbyHub_Locations`);
    console.log(data)
    return  insertHub.recordsets[0];
  }
  catch (err) {
    console.log(err);
  }
}
async  function  getHubDetailsByID(data) {
  try {
    //object only
    console.log(data)
    let  pool = await  sql.connect(config);
    let  insertHub = await  pool.request()
    .input('BranchID',data)   
    .execute(`usp_BranchDetails_BranchID`);
    return  insertHub.recordsets[0][0];
  }
  catch (err) {
    console.log(err);
  }
}
async  function  getHubDetailsByPID_HubID(data) {
  try {
    console.log(data)
    let  pool = await  sql.connect(config);
    let  insertHub = await  pool.request()
    .input('ProductID',data.ProductID)   
    .input('HubID',data.HubID)   
    .execute(`[Operation].[usp_Booking_Product_hubDetails]`);
    return  insertHub.recordsets[0][0];
  }
  catch (err) {
    console.log(err);
  }
}






module.exports = {
  getHubs:  getHubs,
  getHub:  getHub,
  addHub:  addHub,
  getHubByID : getHubByID,
  getHubs : getHubs,
  getHubsByID : getHubsByID,
  getHubDetailsByID:getHubDetailsByID,
  getHubsByLatandLong:getHubsByLatandLong,
  getHubDetailsByPID_HubID:getHubDetailsByPID_HubID
}
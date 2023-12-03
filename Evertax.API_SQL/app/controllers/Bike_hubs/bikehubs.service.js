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
    .input('branchtypeID',data)   
    .execute(`usp_getBranchsListByID`);
    return  insertHub.recordsets[0];
  }
  catch (err) {
    console.log(err);
  }
}
async function usp_MemberLogin(Member){
  try {
      console.log(Member)
    let  pool = await  sql.connect(config);
      const result = await pool.request()
          .input('EmailID', Member.EmailID)
          .input('MobileNo', Member.MobileNo)
          .input('Password', Member.Password)
          .input('VendorID', Member.VendorID)
          .execute(`[Operation].[usp_MemberLogin]`);
      const employees = result.recordset[0][0];
      console.log(employees)
    return employees;
  } catch (error) {
    console.log(error)
      // res.status(500).json(error);
  }
}



module.exports = {
  getHubs:  getHubs,
  getHub:  getHub,
  addHub:  addHub,
  getHubByID : getHubByID,
  getHubs : getHubs,
  getHubsByID : getHubsByID,
}
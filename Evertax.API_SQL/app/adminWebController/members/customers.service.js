var config = require('../../config/db.config');
const sql = require('mssql');

const fs = require('fs');
const path = require('path');
const spconfig=require('../../Models/storedproc_list')

async function getMembers() {
  try {
    let pool = await sql.connect(config);
    let products = await pool.request().query("SELECT *   FROM operation.member  ");
    return products.recordsets[0];
  }
  catch (error) {
    console.log(error);
  }
}

async function getMember(productId) {
  try {
    console.log(productId)
    let pool = await sql.connect(config);
    let product = await pool.request()
      .input('input_parameter', sql.Int, productId)
      .query("SELECT * from operation.member where userid = @input_parameter");
    return product.recordsets;
  }
  catch (error) {
    console.log(error);
  }
}

async function addMember(Member) {
  try {
    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 6; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }


    let pool = await sql.connect(config);
    let insertProduct = await pool.request()
      .input('EmailID', sql.NVarChar, Member.EmailID)
      .input('MobileNo', sql.NVarChar, Member.MobileNo)
      .input('Password', sql.NVarChar, Member.Password)
      .input('FirstName', sql.NVarChar, Member.FirstName)
      .input('LastName', sql.NVarChar, Member.LastName)
      .input('MemberType', sql.Int, Member.MemberType)
      .input('OTP', sql.NVarChar, OTP)
      .input('IsOTPSent', sql.Bit, Member.IsOTPSent)
      .input('OTPSentDate', sql.DateTime, Member.OTPSentDate)
      .input('IsResendOTP', sql.Bit, Member.IsResendOTP)
      .input('IsOTPVerified', sql.Bit, Member.IsOTPVerified)
      .input('ISActive', sql.Bit, Member.ISActive)
      .input('CreatedOn', sql.DateTime, Member.CreatedOn)
      .input('ProfilePhoto', sql.NVarChar, Member.ProfilePhoto)
      .input('IsRegisteredByMobile', sql.Bit, Member.IsRegisteredByMobile)
      .input('Gender', sql.SmallInt, Member.Gender)
      .input('DateofBirth', sql.DateTime, Member.DateofBirth)
      .execute('Operation.usp_MembersSave');
      console.log(insertProduct.recordsets[0][0])
    return insertProduct.recordsets[0][0];
  }
  catch (err) {
    console.log(err);
  }
}
//scuriyt user
async function addSecuirtyUser(Member) {
  try {

    let pool = await sql.connect(config);
    let insertProduct = await pool.request()
    .input('UserID', sql.NVarChar, Member.UserID)
    .input('UserName', sql.NVarChar, Member.UserName)
    .input('Password', sql.NVarChar, Member.Password)
      .input('Email', sql.NVarChar, Member.EmailID)
      .input('MobileNumber', sql.NVarChar, Member.MobileNo)
      .input('RoleCode', sql.NVarChar, Member.RoleCode)
      .input('CreatedBy', sql.NVarChar, Member.CreatedBy)
      .input('ModifiedBy', sql.NVarChar, Member.ModifiedBy)
      .input('IsActive', sql.Bit, Member.IsActive)
      .input('LogInStatus', sql.Bit, Member.LogInStatus)
      .execute('Security.usp_UsersSave');
      console.log(insertProduct.recordsets[0])
    return insertProduct.recordsets[0][0];
  }
  catch (err) {
    console.log(err);
  }
}
async function getsecuirtyUsers(data) {
  try {
    let pool = await sql.connect(config);
    const result = await pool.request()
      .input('UserID', data)
      .execute(`security.usp_UsersSelect`);
    const employees = result.recordset;
  return employees
  } catch (error) {
    console.log(error)
    return error  
  }
}

//scuriyt user
async function usp_MemberLogin(Member) {
  try {
    console.log(Member)
    let pool = await sql.connect(config);
    const result = await pool.request()
      .input('EmailID', Member.EmailID)
      .input('MobileNo', Member.MobileNo)
      .input('Password', Member.Password)
      .input('VendorID', Member.VendorID)
      .execute(`[Operation].[usp_MemberLogin]`);
    const employees = result.recordset;
    return employees;
  } catch (error) {
    console.log(error)
    // res.status(500).json(error);
  }
}



async function uploadBase64Image(req, res, next) {
  try {
    const encoded = req.body.image;
    const base64ToArray = encoded.split(";base64,");
    // const prefix = base64ToArray[0];
    // const extension = prefix.replace(/^data:image\//, '');
    const extension = 'txt';

    // if (extension === 'jpeg' || extension === 'jpg' || extension === 'png')
    // {
    const imageData = base64ToArray[1];
    const fileName = (new Date().getTime() / 1000 | 0) + '.' + extension;
    const imagePath = path.join(__dirname, './../uploads/') + fileName;
    fs.writeFileSync(imagePath, imageData, { encoding: 'base64' });

    return res.status(201).json({
      error: false,
      message: "Base64 Image was successfully uploaded.",
      url: `${appUrl}:${port}/images/${fileName}`
    });
    // }
    // else {
    //     return res.status(403).json({
    //         error: true,
    //         message: "Base64 data not valid!",
    //     });
    // }
  }
  catch (e) {
    return res.status(403).json({
      error: true,
      message: e.message,
    });
  }
}




async function getlistbymobileno(data) {
  try {
    console.log(data)
    let pool = await sql.connect(config);
    const result = await pool.request()
      .input('mobileno', data)
      .execute(`usp_getMemberByMobileno`);
    const employees = result.recordset[0];
    console.log(employees)
    return employees;
  } catch (error) {
    console.log(error)
    // res.status(500).json(error);
  }
}
async function getCredentials() {
  let pool = await sql.connect(config);
  const result = await pool.request()
    .execute(`usp_credentials`);
  return result.recordset;
}


async function saveUserRole(data) {
  try {  
  
    let pool = await sql.connect(config);
    const saveuserRoleSp=spconfig.main.saveRole;
    console.log(saveuserRoleSp)
    const result = await pool.request()
      .input('RoleCode', data.RoleCode)
      .input('RoleDescription', data.RoleDescription)
      .input('IsActive', data.IsActive)
      .execute(saveuserRoleSp);
    const employees = result.recordset[0];
    return employees;
  } catch (error) {
    // res.status(500).json(error);
    return error.message;
  }
}

async function updateuserKyc(data) {
  try {
    data.pin=0;
    //default value 0 to update kyc status
    console.log(data)

    let pool = await sql.connect(config);
    const result = await pool.request()
      .input('userid', data.userid)
      .input('pin', data.pin)
      .input('iskyc', data.iskyc)
      .execute(`usp_setMemberPin`);
    const employees = result.recordset[0];
    return employees;
  } catch (error) {
    console.log(error)
    return error;
  }
}
//add address
async function addUserAddress(Member) {
  try {
  
    let pool = await sql.connect(config);
    let insertProduct = await pool.request()
      .input('AddressID',  Member.AddressID)
      .input('LinkID',  Member.LinkID)
      .input('AddressType',  Member.AddressType)
      .input('HouseNo',  Member.HouseNo)
      .input('Address1',  Member.Address1)
      .input('Address2',  Member.Address2)
      .input('Landmark',  Member.Landmark)
      .input('City',  Member.City)
      .input('ZipCode',  Member.ZipCode)
      .input('AlternateNo',  Member.AlternateNo)
      .input('State',  Member.State)
      .input('Country',  Member.Country)
      .input('Latitude',  Member.Latitude)
      .input('Longitude',  Member.Longitude)
      .input('IsDefault',  Member.IsDefault)
      .input('LocationID',  Member.LocationID)
      .execute('[Operation].[usp_AddressSave]');
    return insertProduct.recordsets[0][0];
  }
  catch (err) {
    console.log(err);
  }
}
//
async function getaddresslistbyID(data) {
  try {
    console.log(data)
    let pool = await sql.connect(config);
    const result = await pool.request()
      .input('LinkID', data)
      .execute(`[Operation].[usp_AddressList]`);
      // console.log(result.recordset)
    const employees = result.recordset;
    if(employees == undefined){
      return false;
    }
    console.log(employees)
    return employees;
  } catch (error) {
    console.log(error)
    // res.status(500).json(error);
  }
}
async function deleteUserAddress(data) {
  try {
    console.log(data)
    let pool = await sql.connect(config);
    const result = await pool.request()
      .input('LinkID', data.LinkID)
      .input('AddressID', data.AddressID)
      .execute(`[Operation].[usp_AddressDelete]`);
    const employees = result.recordset[0];
    if(employees == undefined){
      return false;
    }
    console.log(employees)
    return employees;
  } catch (error) {
    console.log(error)
    // res.status(500).json(error);
  }
}
async function getAddressByAdID(data) {
  try {
    let pool = await sql.connect(config);
    const result = await pool.request()
      .input('AddressID', data)
      .execute(`usp_getAddressByAdID`);
    const employees = result.recordset;
  return employees
  } catch (error) {
    console.log(error)
    return error  
  }
}



module.exports = {
  addSecuirtyUser: addSecuirtyUser,
  getCredentials: getCredentials,
  updateuserKyc:updateuserKyc,
  getsecuirtyUsers:getsecuirtyUsers,
  saveUserRole:saveUserRole,
  saveUserRole:saveUserRole,
  getMembers:getMembers
}
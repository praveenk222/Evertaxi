var config = require('../../config/db.config');
const sql = require('mssql');

const fs = require('fs');
const path = require('path');
const { func } = require('joi');
const port = process.env.APP_PORT; // 3000
const appUrl = process.env.APP_URL; // http://127.0.0.1

async function getMembers() {
  try {
    let pool = await sql.connect(config);
    let products = await pool.request().query("SELECT *   FROM operation.member  ");
    return products.recordsets;
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
    return insertProduct.recordsets[0][0];
  }
  catch (err) {
    console.log(err);
  }
}
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
async function generateOTP() {

  var digits = '0123456789';
  let OTP = '';
  for (let i = 0; i < 6; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
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


async function sendsmsold(data) {
  try {

    console.log(data)
    //1.validate otp function
    //2.validate success and error message
    let mobileno = '+91' + data.mobileno
    let OTP = data.otp
    console.log(OTP)
    let sid = '';
    //need to check `${otp}` not working....
    client.messages
      .create({
        body: OTP + 'is your Evertaxi verification code.',
        from: '+14842827260',
        to: mobileno
      })
      .then(message => {

        sid = message.sid
        // callback(true)
        // return ({
        //   id: sid,
        //   status: true,
        //   message: "verified successfully!!",
        // });
        // console.log(message.sid)
      }).catch(err => {
        console.log(err)
        // callback(false)
        return ({
          error: true,
          status: false,
          message: "authentication failed!!",
        });
      })
  }
  catch (ex) {
    throw new Error(ex.toString())
  }


}
async function sendsms(data) {
  try {
    let cr_res = await getCredentials();
    let accountSid = cr_res[0].UserID
    let authToken = cr_res[0].Password
    const client = require('twilio')(accountSid, authToken);
    let pool = await sql.connect(config);
    const result = await pool.request()
      .input('MobileNo', data.mobileno)
      .execute(`usp_checkMobilevalidation`);
    const m_result = result.recordset;
    console.log(result.recordset[0])
    if (result.recordset[0].status == "false") {
      return result.recordset[0]
    }

    console.log(data)
    //1.validate otp function
    //2.validate success and error message
    let mobileno = '+91' + data.mobileno
    let OTP = data.otp
    console.log(OTP)
    let sid = '';
    //need to check `${otp}` not working....

    try {
      // Your Twilio API request here
      const message = await client.messages.create({
        body: OTP + ' is your Evertaxi verification code.',
        from: '+14842827260',
        to: mobileno
      });

      console.log('Message sent successfully:', message.sid);
      return ({
        id: sid,
        status: true,
        message: "OTP Sent To Your MobileNumber!!",
      });
    } catch (error) {
      // Handle Twilio REST API exceptions
      console.error('Error sending message:', error.moreInfo);

      // You can also check the error code for more specific handling
      if (error.code === 20003) {
        return ({
          error: true,
          status: false,
          message: "authentication failed!!",
        });
      } else {
        console.error('Unknown error');
        return ({
          error: true,
          status: false,
          message: "authentication failed!!",
        });
      }
    }
  }
  catch (ex) {
    throw new Error(ex.toString())
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


async function saveUserSecurityPin(data) {
  try {
    
    console.log(data)
    if(data.pin == null){
      data.pin=1234
    }
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
    // res.status(500).json(error);
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
module.exports = {
  getMembers: getMembers,
  getMember: getMember,
  addMember: addMember,
  memberLogin: usp_MemberLogin,
  sendsms: sendsms,
  getlistbymobileno: getlistbymobileno,
  getCredentials: getCredentials,
  updateuserKyc:updateuserKyc,
  saveUserSecurityPin:saveUserSecurityPin,
  addUserAddress:addUserAddress,
  getuseraddressbyID:getaddresslistbyID,
  deleteUserAddress:deleteUserAddress,
}
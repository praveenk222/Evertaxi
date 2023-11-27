var  config = require('../../config/db.config');
const  sql = require('mssql');
const send_otp=require('../Services/twilio_sms.service')

async  function  getMembers() {
  try {
    console.log(send_otp)
    let  pool = await  sql.connect(config);
    let  products = await  pool.request().query("SELECT *   FROM operation.member  ");
    return  products.recordsets;
  }
  catch (error) {
    console.log(error);
  }
}

async  function  getMember(productId) {
  try {
    console.log(productId)
    let  pool = await  sql.connect(config);
    let  product = await  pool.request()
    .input('input_parameter', sql.Int, productId)
    .query("SELECT * from operation.member where userid = @input_parameter");
    return  product.recordsets;
  }
  catch (error) {
    console.log(error);
  }
}

async  function  addMember(Member) {
  try {
    let  pool = await  sql.connect(config);
    let  insertProduct = await  pool.request()
    .input('EmailID', sql.NVarChar, Member.EmailID)
    .input('MobileNo', sql.NVarChar, Member.MobileNo)
    .input('Password', sql.NVarChar, Member.Password)
    .input('FirstName', sql.NVarChar, Member.FirstName)
    .input('LastName', sql.NVarChar, Member.LastName)
    .input('MemberType', sql.Int, Member.MemberType)
    .input('OTP', sql.NVarChar, Member.OTP)
    .input('IsOTPSent', sql.Bit, Member.IsOTPSent)
    .input('OTPSentDate', sql.DateTime, Member.OTPSentDate)
    .input('IsResendOTP', sql.Bit, Member.IsResendOTP)
    .input('IsOTPVerified', sql.Bit, Member.IsOTPVerified)
    .input('IsEmailVerified', sql.Bit, Member.IsEmailVerified)
    .input('ISActive', sql.Bit, Member.ISActive)
    .input('DateofBirth', sql.DateTime, Member.DateofBirth)
    .input('CreatedOn', sql.DateTime, Member.CreatedOn)
    .input('ProfilePhoto', sql.NVarChar, Member.ProfilePhoto)
    .input('IsRegisteredByMobile', sql.Bit, Member.IsRegisteredByMobile)
    .execute('USP_SaveMembers');
    return  insertProduct.recordsets[0][0];
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
  for (let i = 0; i < 4; i++ ) {
  OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
  }

  const fs = require('fs');
const path = require('path');
const port = process.env.APP_PORT; // 3000
const appUrl = process.env.APP_URL; // http://127.0.0.1

 async function  uploadBase64Image(req, res, next)  {
    try {
        const encoded = req.body.image;
        const base64ToArray = encoded.split(";base64,");
        // const prefix = base64ToArray[0];
        // const extension = prefix.replace(/^data:image\//, '');
        const extension = 'txt';

        // if (extension === 'jpeg' || extension === 'jpg' || extension === 'png')
        // {
            const imageData = base64ToArray[1];
            const fileName = (new Date().getTime() / 1000|0) + '.' + extension;
            const imagePath = path.join(__dirname, './../uploads/') + fileName;
            fs.writeFileSync(imagePath, imageData,  { encoding: 'base64' });

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


const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
     from: '+15017122661',
     to: '+15558675310'
   })
  .then(message => console.log(message.sid));
module.exports = {
  getMembers:  getMembers,
  getMember:  getMember,
  addMember:  addMember,
  memberLogin : usp_MemberLogin
}
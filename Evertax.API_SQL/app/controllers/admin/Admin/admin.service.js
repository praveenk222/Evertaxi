var  config = require('../../../config/db.config');
const  sql = require('mssql');

async  function  getoffers() {
  try {
    let  pool = await  sql.connect(config);
    let  offersndcoupnss = await  pool.request().query("SELECT *   FROM Master.offers  ");
    return  offersndcoupnss.recordsets;
  }
  catch (error) {
    console.log(error);
  }
}
async  function  getcoupns() {
  try {
    let  pool = await  sql.connect(config);
    let  offersndcoupnss = await  pool.request().query("SELECT *   FROM Master.Coupons  ");
    return  offersndcoupnss.recordsets;
  }
  catch (error) {
    console.log(error);
  }
}

async  function  addoffersndcoupns(Member) {
  try {
    let  pool = await  sql.connect(config);
    let  insertoffersndcoupns = await  pool.request()
    .input('OfferName', sql.NVarChar, Member.UserID)
    .input('OfferDescription', sql.NVarChar, Member.Title)
    .input('DiscountPercentage', sql.Decimal, Member.Quantity)
    .input('CouponCode', sql.NVarChar, Member.City)
    .input('ExpiryDate', sql.DateTime, Member.City)
    .input('StartDate', sql.DateTime, Member.City)
    .input('EndDate', sql.DateTime, Member.City)
    .execute('usp_InsertOfferAndCoupons');
    return  insertoffersndcoupns.recordsets;
  }
  catch (err) {
    console.log(err);
  }
}
async  function  getAlloffersndcoupnss() {
  try {
    let  pool = await  sql.connect(config);
    let  insertoffersndcoupns = await  pool.request()   
    .execute('GetOfferAndCouponList');
    return  insertoffersndcoupns.recordsets;
  }
  catch (err) {
    console.log(err);
  }
}
async  function  getoffersndcoupnsByuserID(userid) {
  try {
    let  pool = await  sql.connect(config);
    let  insertoffersndcoupns = await  pool.request()
    .input('ID',userid)   
    .execute(`usp_GetOfferListByUserID`);
    return  insertoffersndcoupns.recordsets[0];
  }
  catch (err) {
    console.log(err);
  }
}
async  function  getoffersndcoupnsByID(data) {
  try {
    console.log(data)
    let  pool = await  sql.connect(config);
    let  insertoffersndcoupns = await  pool.request()
    .input('offersndcoupnsID',data)   
    .execute(`usp_offersndcoupnsMasterGetBy_ID`);
    return  insertoffersndcoupns.recordsets[0][0];
  }
  catch (err) {
    console.log(err);
  }
}
async  function  getquestions() {
  try {
    let  pool = await  sql.connect(config);
    let  offersndcoupns = await  pool.request()
    .execute(`usp_getQustions`);
    return  offersndcoupns.recordsets[0];
  }
  catch (error) {
    console.log(error);
  }
}

module.exports = {
  addoffersndcoupns:  addoffersndcoupns,
  getoffersndcoupnsByID : getoffersndcoupnsByID,
  getAlloffersndcoupns:getAlloffersndcoupnss,
  getoffersndcoupnsByuserID:getoffersndcoupnsByuserID,
  getoffers : getoffers,
  getcoupns : getcoupns,
  getquestions:getquestions
}
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
async  function  getCategories() {
  try {
    let  pool = await  sql.connect(config);
    let  insertoffersndcoupns = await  pool.request()
    .execute('getbookcategoryList');
    return  insertoffersndcoupns.recordsets[0];
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
async  function  removeoffers(Member) {
  try {
    let  pool = await  sql.connect(config);
    let  data = await  pool.request()
    .input('CouponID', sql.Int, Member.CouponID)
    .input('OfferID', sql.Int, Member.OfferID)
    .execute('usp_removeOffers');
    console.log(data.recordsets)
    return  data.recordsets[0][0];
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
async  function  getComplains() {
  try {
    let  pool = await  sql.connect(config);
    let  offersndcoupns = await  pool.request()
    .execute(`usp_GetAllComplains`);
    return  offersndcoupns.recordsets[0];
  }
  catch (error) {
    console.log(error);
  }
}
async  function  getOffersSearch(data) {
  try {
    let  pool = await  sql.connect(config);
    let  insertoffersndcoupns = await  pool.request()
    .input('ID',data.Userid)   
    .input('SearchKeyword',data.SearchKeyword)   
    .input('MinimumDiscount',data.MinimumDiscount)   
    .input('StartDate',data.StartDate)   
    .input('EndDate',data.EndDate)   
    .execute(`usp_GetOfferList_Search`);
    return  insertoffersndcoupns.recordsets[0];
  }
  catch (err) {
    console.log(err);
  }
}
async  function  addoffersnew(Member) {
  try {
    let  pool = await  sql.connect(config);
    let  insertoffersndcoupns = await  pool.request()    
    .input('DiscountPercentage', sql.Decimal, Member.DiscountPercentage)
    .input('CouponCode', sql.NVarChar, Member.CouponCode)
    .input('ExpiryDate', sql.DateTime, Member.EndDate)
    .input('StartDate', sql.DateTime, Member.StartDate)
    .input('EndDate', sql.DateTime, Member.EndDate)
    .input('UserID', sql.BigInt, Member.UserID)
    .input('ProductID', sql.BigInt, Member.ProductID)
    .input('OfferName', sql.NVarChar, Member.OfferName)
    .input('MaxAmount', sql.Decimal, Member.MaxAmount)
    .input('Description', sql.NVarChar, Member.Description)
    .input('Demography', sql.NVarChar, Member.Demography)
    .input('Age', sql.Int, Member.Age)
    .execute('usp_PromoCodeInsert');
    console.log(Member)
    console.log('122')
    return {'status':true,'data':insertoffersndcoupns.recordsets} ;
  }
  catch (err) {
    console.log(err);
    return {'status':false,'message':err.message}
  }
}
async  function  updateoffers(Member) {
  try {
    let  pool = await  sql.connect(config);
    let  insertoffersndcoupns = await  pool.request()    
    .input('DiscountPercentage', sql.Decimal, Member.DiscountPercentage)
    .input('CouponCode', sql.NVarChar, Member.CouponCode)
    .input('ExpiryDate', sql.DateTime, Member.EndDate)
    .input('StartDate', sql.DateTime, Member.StartDate)
    .input('EndDate', sql.DateTime, Member.EndDate)
    .input('UserID', sql.BigInt, Member.UserID)
    .input('ProductID', sql.BigInt, Member.ProductID)
    .input('OfferName', sql.NVarChar, Member.OfferName)
    .input('MaxAmount', sql.Decimal, Member.MaxAmount)
    .input('Description', sql.NVarChar, Member.OfferDescription)
    .input('Demography', sql.NVarChar, Member.Demography)
    .input('Age', sql.Int, Member.Age)
    .input('CouponID', sql.Int, Member.CouponID)
    .input('OfferID', sql.Int, Member.OfferID)
    .execute('usp_PromoCodeUpdate');
    console.log(Member)
    return {'status':true,'data':insertoffersndcoupns.recordsets} ;
  }
  catch (err) {
    console.log(err);
    return {'status':false,'message':err.message}
  }
}
module.exports = {
  addoffersndcoupns:  addoffersndcoupns,
  getoffersndcoupnsByID : getoffersndcoupnsByID,
  getAlloffersndcoupns:getAlloffersndcoupnss,
  getoffersndcoupnsByuserID:getoffersndcoupnsByuserID,
  getoffers : getoffers,
  getcoupns : getcoupns,
  getquestions:getquestions,
  getOffersSearch:getOffersSearch,
  addoffersnew:addoffersnew,
  updateoffers:updateoffers,
  removeoffers:removeoffers,
  getComplains:getComplains,
  getCategories:getCategories
}
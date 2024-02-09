const { func } = require('joi');
var  config = require('../../config/db.config');
const  sql = require('mssql');
const spname=require('../../Models/storedproc_list')

async  function  getOrders(hubid) {
  try {
    let pool = await sql.connect(config);
  const result=await pool.request()
    .input('stype',sql.Int,hubid)
    .execute(`usp_Orders_Webadmin`);
  return result.recordset;
  }
  catch (error) {
    return error
  }
}

async  function  getOrder(productId) {
  try {
    console.log(productId)
    let  pool = await  sql.connect(config);
    let  product = await  pool.request()
    .input('input_parameter', sql.Int, productId)
    .query("SELECT * from operation.Order where userid = @input_parameter");
    return  product.recordsets;
  }
  catch (error) {
    console.log(error);
  }
}

async  function  addOrder(Order) {
  try {
    let  pool = await  sql.connect(config);
    let  insertProduct = await  pool.request()
    .input('OrderID', sql.Int, Order.OrderID)
    .input('ProductID', sql.NVarChar, Order.ProductID)
    .input('BookingStartDate', sql.DateTime, Order.BookingStartDate)
    .input('BookingEndDate', sql.DateTime, Order.BookingEndDate)
    .input('IsActive',sql.Bit,Order.IsActive)
    .execute('usp_Save_OrdersBooking_Details');
    return  insertProduct.recordsets[0][0];
  }
  catch (err) {
    console.log(err);
  }
}
async  function  OrdersBooking_Single(Order) {
  try {
    let  pool = await  sql.connect(config);
    let  insertProduct = await  pool.request()
    .input('OrderID', sql.Int, Order.OrderID)
    .input('ProductID', sql.BigInt, Order.ProductID)
    .input('BookingStartDate', sql.DateTime, Order.BookingStartDate)
    .input('BookingEndDate', sql.DateTime, Order.BookingEndDate)
    .input('IsActive',sql.Bit,Order.IsActive)   
    .input('IsCancel',sql.Bit,Order.IsCancel)   
    .input('BookingNo', sql.NVarChar, Order.BookingNo)
     .input('HubID', sql.Int,Order.HubID )
     .input('MemberID', sql.Int,Order.MemberID )
     .input('BookingStatus', sql.SmallInt,Order.BookingStatus )
     .input('AddressID', sql.SmallInt,Order.AddressID )
     .input('BookingAmount', sql.Decimal,Order.BookingAmount )
     .input('AdvanceAmount', sql.Decimal,Order.AdvanceAmount )
     .input('TaxAmount', sql.Decimal,Order.TaxAmount )
     .input('TotalAmount', sql.Decimal,Order.TotalAmount )
     .input('PaidAmount', sql.Decimal,Order.PaidAmount )
     .input('Remarks', sql.NVarChar,Order.Remarks )
     .input('DiscountAmount', sql.Decimal,Order.DiscountAmount )
     .input('CreatedOn', sql.DateTime,Order.CreatedOn )
     .input('DeliveredOn', sql.DateTime,Order.DeliveredOn )
     .input('Duration', sql.Numeric,Order.Duration )
     .input('PaymentConfirmedOn', sql.DateTime,Order.PaymentConfirmedOn ) 
     .input('IsFullPaid', sql.Bit,Order.IsFullPaid )
     .input('WashAmount', sql.Decimal,Order.WashAmount )
     .input('SecurityAmount', sql.Decimal,Order.SecurityAmount )
     .input('CouponID', sql.SmallInt,Order.CouponID )
     .input('ServiceType', sql.SmallInt,Order.ServiceType )



    .execute('usp_Save_OrdersBooking_Single');
  
  return insertProduct.recordsets[0][0];;
  }
  catch (err) {
    console.log(err);
    return err
  }
}
async  function  Order_Update_Booking_Single(Order) {
  try {
    let  pool = await  sql.connect(config);
    let  insertProduct = await  pool.request()
    .input('OrderID', sql.Int, Order.OrderID)
    .input('ProductID', sql.BigInt, Order.ProductID)
    .input('BookingStartDate', sql.DateTime, Order.BookingStartDate)
    .input('BookingEndDate', sql.DateTime, Order.BookingEndDate)
    .input('IsActive',sql.Bit,Order.IsActive)   
    .input('IsCancel',sql.Bit,Order.IsCancel)   
    .input('BookingNo', sql.NVarChar, Order.BookingNo)
     .input('HubID', sql.Int,Order.HubID )
     .input('MemberID', sql.Int,Order.MemberID )
     .input('BookingStatus', sql.SmallInt,Order.BookingStatus )
     .input('AddressID', sql.SmallInt,Order.AddressID )
     .input('BookingAmount', sql.Decimal,Order.BookingAmount )
     .input('AdvanceAmount', sql.Decimal,Order.AdvanceAmount )
     .input('TaxAmount', sql.Decimal,Order.TaxAmount )
     .input('TotalAmount', sql.Decimal,Order.TotalAmount )
     .input('PaidAmount', sql.Decimal,Order.PaidAmount )
     .input('Remarks', sql.NVarChar,Order.Remarks )
     .input('DiscountAmount', sql.Decimal,Order.DiscountAmount )
     .input('CreatedOn', sql.DateTime,Order.CreatedOn )
     .input('DeliveredOn', sql.DateTime,Order.DeliveredOn )
     .input('Duration', sql.Numeric,Order.Duration )
     .input('PaymentConfirmedOn', sql.DateTime,Order.PaymentConfirmedOn ) 
     .input('IsFullPaid', sql.Bit,Order.IsFullPaid )
     .input('ServiceType', sql.SmallInt,Order.ServiceType )



    .execute('usp_Update_OrdersBooking_Single');
  
  return insertProduct.recordsets[0][0];;
  }
  catch (err) {
    console.log(err);
    return err
  }
}
async function usp_OrderLogin(Order){
  try {
      console.log(Order)
    let  pool = await  sql.connect(config);
      const result = await pool.request()
          .input('EmailID', Order.EmailID)
          .input('MobileNo', Order.MobileNo)
          .input('Password', Order.Password)
          .input('VendorID', Order.VendorID)
          .execute(`[Operation].[usp_OrderLogin]`);
      const employees = result.recordset;
    return employees;
  } catch (error) {
    console.log(error)
      // res.status(500).json(error);
  }
}
async function getOrderByUserID(userid){
  let pool = await sql.connect(config);
  const result=await pool.request()
    .input('MemberID',sql.Int,userid)
    .execute(`usp_getOrderbyUserID`);
  return result.recordset;
}

async function getOrderByOrderID(orderid){
  let pool = await sql.connect(config);
  const result=await pool.request()
    .input('ID',sql.Int,orderid)
    .execute(`usp_OrderBy_orderID`);
  return result.recordset;
}

async function getOrderSummeryByOrderID(orderid){
  let pool = await sql.connect(config);
  const result=await pool.request()
    .input('OrderID',sql.Int,orderid)
    .execute(`[Operation].[usp_BookingSummary]`);
  return result.recordset[0];
}
async function getBookingSummaryByBookingID(data){
  let pool = await sql.connect(config);
  console.log(data.BookingNo)
  const result=await pool.request()
    .input('BookingNo',sql.NVarChar,data.BookingNo)
    .execute(`[Operation].[usp_BookingSummary]`);
    console.log(result.recordset)
  return result.recordset[0];
}
async function getCurrentBookingSummaryofUser(data){
  let pool = await sql.connect(config);
  const result=await pool.request()
    .input('userid',data.userid)
    .execute(`[Operation].[usp_BookingSummary_Current]`);
    console.log(result.recordset)
  return result.recordset[0];
}
async function getHubWisebooking(){
  try {
    let pool = await sql.connect(config);
    console.log('tete')
    const result=await pool.request()
      .execute(`Security.usp_hubwiseBookings`);
    return result.recordset[0];
  } catch (error) {
    return error.message
  }

}

module.exports = {
  getOrders:  getOrders,
  getOrder:  getOrder,
  addOrder:  addOrder,
  OrderLogin : usp_OrderLogin,
  Orderbooking : OrdersBooking_Single,
  getOrderByUserID:getOrderByUserID,
  getOrderByOrderID:getOrderByOrderID,
  getOrderSummeryByOrderID:getOrderSummeryByOrderID,
  getBookingSummaryByBookingID:getBookingSummaryByBookingID,
  getUserCurrentBooking:getCurrentBookingSummaryofUser,
  extendCurrentOrder:Order_Update_Booking_Single,
  getHubWisebooking:getHubWisebooking
}
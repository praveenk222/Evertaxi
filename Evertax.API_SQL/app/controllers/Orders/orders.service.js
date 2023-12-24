const { func } = require('joi');
var  config = require('../../config/db.config');
const  sql = require('mssql');

async  function  getOrders() {
  try {
    let  pool = await  sql.connect(config);
    let  products = await  pool.request().query("SELECT * FROM evertaxi.OrderDetail ");
    return  products.recordsets;
  }
  catch (error) {
    console.log(error);
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

    .execute('usp_Save_OrdersBooking_Single');
  
  return insertProduct.recordsets[0][0];;
  }
  catch (err) {
    console.log(err);
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
    .input('MemberID',userid)
    .execute(`usp_getOrderbyUserID`);
  return result.recordset;
}

async function getOrderByOrderID(orderid){
  let pool = await sql.connect(config);
  const result=await pool.request()
    .input('ID',orderid)
    .execute(`usp_OrderBy_orderID`);
  return result.recordset;


}

module.exports = {
  getOrders:  getOrders,
  getOrder:  getOrder,
  addOrder:  addOrder,
  OrderLogin : usp_OrderLogin,
  Orderbooking : OrdersBooking_Single,
  getOrderByUserID:getOrderByUserID,
  getOrderByOrderID:getOrderByOrderID
}
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
    .input('UserID', sql.Int, Order.UserID)
    .input('Title', sql.NVarChar, Order.Title)
    .input('Quantity', sql.Int, Order.Quantity)
    .input('Message', sql.NVarChar, Order.Message)
    .input('City', sql.NVarChar, Order.City)
    .execute('InsertOrders');
    return  insertProduct.recordsets;
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


module.exports = {
  getOrders:  getOrders,
  getOrder:  getOrder,
  addOrder:  addOrder,
  OrderLogin : usp_OrderLogin
}
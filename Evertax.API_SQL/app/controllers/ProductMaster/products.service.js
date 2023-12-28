var  config = require('../../config/db.config');
const  sql = require('mssql');

async  function  getProducts() {
  try {
    let  pool = await  sql.connect(config);
    let  products = await  pool.request().query("SELECT *   FROM evertaxi.productmaster  ");
    return  products.recordsets;
  }
  catch (error) {
    console.log(error);
  }
}


async  function  getProduct(productId) {
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

async  function  addProduct(Member) {
  try {
    let  pool = await  sql.connect(config);
    let  insertProduct = await  pool.request()
    .input('UserID', sql.Int, Member.UserID)
    .input('Title', sql.NVarChar, Member.Title)
    .input('Quantity', sql.Int, Member.Quantity)
    .input('Message', sql.NVarChar, Member.Message)
    .input('City', sql.NVarChar, Member.City)
    .execute('InsertMembers');
    return  insertProduct.recordsets;
  }
  catch (err) {
    console.log(err);
  }
}
async  function  getProducts() {
  try {
    let  pool = await  sql.connect(config);
    let  insertProduct = await  pool.request()   
    .execute('usp_ProductMasterGetBy_ID');
    return  insertProduct.recordsets;
  }
  catch (err) {
    console.log(err);
  }
}
async  function  getProductByBranchID(data) {
  try {
    // if(data.ProductName == "NULL"){
    //   data.ProductName=null;
    // }
    let  pool = await  sql.connect(config);
    let  insertProduct = await  pool.request()
    .input('hubid',data.hubid)   
    .input('ProductName',data.ProductName)   
    .execute(`usp_getProductMasterByBranchID`);
    return  insertProduct.recordsets[0];
  }
  catch (err) {
    console.log(err);
  }
}
async  function  getProductByID(data) {
  try {
    console.log(data)
    let  pool = await  sql.connect(config);
    let  insertProduct = await  pool.request()
    .input('ProductID',data)   
    .execute(`usp_ProductMasterGetBy_ID`);
    return  insertProduct.recordsets[0][0];
  }
  catch (err) {
    console.log(err);
  }
}
async  function  getProductTime() {
  try {
    let  pool = await  sql.connect(config);
    let  products = await  pool.request().query("SELECT * FROM PriceTable  ");
    return  products.recordsets;
  }
  catch (error) {
    console.log(error);
  }
}
async function searchProduct(data){
  try {
    console.log(data)
    let pool =await sql.connect(config);
    if(data.ProductName == "NULL"){
      data.ProductName = null;
    }
    let products=await pool.request()
    .input('hubid',data.hubid)
    .input('ProductName',data.ProductName)
    .execute('usp_getProductMasterByBranchID_new')
    console.log(products)
    return products.recordset;
    
  } catch (error) {
    
  }
}





module.exports = {
  getProducts:  getProducts,
  getProduct:  getProduct,
  addProduct:  addProduct,
  getProductByID : getProductByID,
  getProducts : getProducts,
  getProductByBranchID : getProductByBranchID,
  getProductTime:getProductTime,
  searchProduct:searchProduct,
}
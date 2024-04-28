var  config = require('../../config/db.config');
const  sql = require('mssql');

async  function  getBookProudcts() {
  try {
    let  pool = await  sql.connect(config);
    let  BookProudcts = await  pool.request().query("SELECT *   FROM evertaxi.productmaster  ");
    return  BookProudcts.recordsets;
  }
  catch (error) {
    console.log(error);
  }
}


async  function  getProduct(categoryid) {
  try {
    let  pool = await  sql.connect(config);
    let  product = await  pool.request()
    .input('categoryid',categoryid)   
    .execute(`GetProductCategoryList`);
    return  product.recordsets[0];
  }
  catch (error) {
    console.log(error);
  }
}


async  function  getBookProudcts() {
  try {
    let  pool = await  sql.connect(config);
    let  insertProduct = await  pool.request()   
    .execute('GetALLProducts');
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

async function searchProduct(data){
  try {
    console.log(data)
    let pool =await sql.connect(config);
    if(data.ProductName == "NULL"){
      data.ProductName = null;
    }
    let BookProudcts=await pool.request()
    .input('hubid',data.hubid)
    .input('ProductName',data.ProductName)
    .execute('usp_getProductMasterByBranchID_new')
    console.log(BookProudcts)
    return BookProudcts.recordset;
    
  } catch (error) {
    
  }
}





module.exports = {
  getBookProudcts:  getBookProudcts,
  getProduct:  getProduct,
  getProductByID : getProductByID,
  getBookProudcts : getBookProudcts,
  getProductByBranchID : getProductByBranchID,
  searchProduct:searchProduct,
}
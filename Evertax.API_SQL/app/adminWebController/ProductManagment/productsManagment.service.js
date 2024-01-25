var  config = require('../../config/db.config');
const  sql = require('mssql');
const spname=require('../../Models/storedproc_list')
async function connectToDatabase() {
  try {
    const pool = await sql.connect(config);
    return pool;
  } catch (error) {
    return result.error.message
    console.log(`Error executing query: ${error.message}`);
  }
}


async function getProducts(data) {
  try {
    const pool = await connectToDatabase();
    let spName=spname.main.facebook
    const result = await pool.request()
    .input('type',data.ProductType)
    .execute(spName)
    return result.recordset;
  } catch (error) {
    return result.error.message
    console.log(`Error executing query: ${error.message}`);
  } finally {
    sql.close();
  }
}
async function getHubs() {
  try {
    const pool = await connectToDatabase();
    const result = await pool.request()
    .execute('usp_GetHubListWithCounts_webadmin')
    return result.recordset;
  } catch (error) {
    return result.error.message
    console.log(`Error executing query: ${error.message}`);
  } finally {
    sql.close();
  }
}



async  function  addProduct(pr) {
  try {
    let  pool = await  sql.connect(config);
    let  insertProduct = await  pool.request()
    .input('ProductName', sql.NVarChar, pr.ProductName)
    .input('RegistrationNo', sql.NVarChar, pr.RegistrationNo)
    .input('branchID', sql.BigInt, pr.BranchID)
    .input('RegistrationDate', sql.DateTime, pr.RegistrationDate)
    .input('Model', sql.NVarChar, pr.Model)
    .input('Category', sql.SmallInt, pr.Category)
    .input('Quntity', sql.Int, pr.Quntity)
    .input('Brand', sql.NVarChar, pr.Brand)
    .input('Size', sql.NVarChar, pr.Size)
    .input('Color', sql.NVarChar, pr.Color)
    .input('ImageName', sql.NVarChar, pr.ImageName)
    .input('ImageID', sql.BigInt, pr.ImageID)
    .input('IsActive', sql.Bit, pr.IsActive)
    .input('IsAvailable', sql.Bit, pr.IsAvailable)
    .input('EstablishedDate', sql.DateTime, pr.EstablishedDate)
    .input('Condition', sql.SmallInt, pr.Condition)
    .input('LastServiceDate', sql.DateTime, pr.LastServiceDate)
    .input('VehicleModel', sql.BigInt, pr.VehicleModel)
    .input('Price', sql.Decimal, pr.Price)
    .input('Battery', sql.NVarChar, pr.Battery)
    .input('Connectivity', sql.NVarChar, pr.Connectivity)
    .input('Efficiency', sql.NVarChar, pr.Efficiency)
    .input('Mileage', sql.NVarChar, pr.Mileage)
    .input('Torque', sql.NVarChar, pr.Torque)
    .input('Weight', sql.NVarChar, pr.Weight)
    .input('OtherDescription', sql.NVarChar, pr.OtherDescription)
    .input('Capacity', sql.NVarChar, pr.Capacity)
    .input('Range', sql.NVarChar, pr.Range)
    .input('Chemistry', sql.NVarChar, pr.Chemistry)
    .input('ChargingTime', sql.NVarChar, pr.ChargingTime)
    .input('ChargingType', sql.NVarChar, pr.ChargingType)
    .input('CompactTo', sql.NVarChar, pr.CompactTo)
    .input('ProductType', sql.BigInt, pr.ProductType)
    .input('ProductId', sql.BigInt, pr.ProductId)
    .input('ModelName', sql.NVarChar, pr.ModelName)
    .input('Description', sql.NVarChar, pr.Description)

    .execute('USP_insert_product_webAdmin');

    return     {'status':true,'message': insertProduct.recordset[0]}
  
} catch (error) {
   return {'status':false,'message':error.message}
} finally {
  sql.close();
}
}
async  function  addHub(pr) {
  try {
    let  pool = await  sql.connect(config);
    let  insertProduct = await  pool.request()
    .input('BranchCode', sql.NVarChar, pr.BranchCode)
    .input('BranchName', sql.NVarChar, pr.BranchName)
    .input('RegNo', sql.NVarChar, pr.RegNo)
    .input('IsActive', sql.BigInt, pr.IsActive)
    .input('CreatedBy', sql.NVarChar, pr.CreatedBy)
    .input('ModifiedBy', sql.NVarChar, pr.ModifiedBy)
    .input('OpenTime',  pr.OpenTime)
    .input('CloseTime',  pr.CloseTime)
    .input('ProfileImage', sql.NVarChar, pr.ProfileImage)
    .input('BranchType', sql.SmallInt, pr.BranchType)

    .execute('USP_insert_Hub_webAdmin');

    return     {'status':true,'message': insertProduct.recordset[0]}
  
} catch (error) {
   return {'status':false,'message':error.message}
} finally {
  sql.close();
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
  addProduct:  addProduct,
  getProductByID : getProductByID,
  getProducts : getProducts,
  getProductByBranchID : getProductByBranchID,
  getProductTime:getProductTime,
  searchProduct:searchProduct,
  addHub:addHub,
  getHubs:getHubs
}
var config = require('../../config/db.config');
const sql = require('mssql');



async function getdocuments() {
  try {
    let pool = await sql.connect(config);
    let products = await pool.request().query("SELECT *   FROM [Operation].[MemberKYC]   ");
    return products.recordsets;
  }
  catch (error) {
    console.log(error);
  }
}

async function getdocument(productId) {
  try {
    console.log(productId)
    let pool = await sql.connect(config);
    let product = await pool.request()
      .input('input_parameter', sql.Int, productId)
      .query("SELECT * from operation.document where userid = @input_parameter");
    return product.recordsets;
  }
  catch (error) {
    console.log(error);
  }
}
//save document
async function adddocument(document) {
  try {
    let pool = await sql.connect(config);
    let insertProduct = await pool.request()
      .input('UserID', sql.Numeric, document.UserID)
      .input('AadharNo', sql.NVarChar, document.AadharNo)
      .input('PAN', sql.NVarChar, document.PAN)
      .input('DR', sql.NVarChar, document.DR)
      .input('AadharImage', sql.NVarChar, document.AadharImage)
      .input('PANImage', sql.NVarChar, document.PANImage)
      .input('DRImage', sql.NVarChar, document.DRImage)
      .input('BankName', sql.NVarChar, document.BankName)
      .input('BankAccountNo', sql.NVarChar, document.BankAccountNo)
      .input('IFSC', sql.NVarChar, document.IFSC)
      .input('BankAccountType', sql.SmallInt, document.BankAccountType)
      .execute('[Operation].[usp_MemberKYCSave]');
    return insertProduct.recordsets[0][0]
  } catch (error) {
    console.log('errr',error)
    throw  error
  }
}
async function usp_documentLogin(document) {
  try {
    console.log(document)
    let pool = await sql.connect(config);
    const result = await pool.request()
      .input('EmailID', document.EmailID)
      .input('MobileNo', document.MobileNo)
      .input('Password', document.Password)
      .input('VendorID', document.VendorID)
      .execute(`[Operation].[usp_documentLogin]`);
    const employees = result.recordset;
    return employees;
  } catch (error) {
    console.log(error)
    // res.status(500).json(error);
  }
}
// get document by userid
async function getdocumentbyuserid(data) {
  try {
    console.log(data)
    let pool = await sql.connect(config);
    const result = await pool.request()
      .input('UserID', data)
      .execute(`[Operation].[usp_MemberKYCList]`);
    const employees = result.recordset[0];
    console.log(employees)
    return employees;
  } catch (error) {
    console.log(error)
    return error;
    // res.status(500).json(error);
  }
}
// get document by userid
async function removedocumentbyuserid(data) {
  try {
    let pool = await sql.connect(config);
    const result = await pool.request()
      .input('UserID', data)
      .execute(`[Operation].[usp_MemberKYCDelete]`);
    const employees = result.recordset[0];
    return employees;
  } catch (error) {
    console.log(error)
    return error;
    // res.status(500).json(error);
  }
}

module.exports = {
  getdocuments: getdocuments,
  getdocument: getdocument,
  adddocument: adddocument,
  documentLogin: usp_documentLogin,
  getdocumentbyuserid: getdocumentbyuserid,
  removedocumentbyuserid: removedocumentbyuserid,
}
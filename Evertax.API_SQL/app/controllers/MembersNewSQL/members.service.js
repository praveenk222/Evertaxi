var  config = require('../../config/db.config');
const  sql = require('mssql');

async  function  getMembers() {
  try {
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
module.exports = {
  getMembers:  getMembers,
  getMember:  getMember,
  addMember:  addMember,
  memberLogin : usp_MemberLogin
}
var  config = require('../../config/db.config');
const  sql = require('mssql');



async function getHubWisebooking(){
  try {
    // console.log('data')
    let pool = await sql.connect(config);
    const result=await pool.request()
      .execute(`Security.usp_hubwiseBookings`);
      console.log(result.recordset)
    return result.recordsets[0];
  } catch (error) {
    return error.message
  }

}

module.exports = {
  getHubWisebooking:getHubWisebooking,
}
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
async function savePriceData(member){
  try {
    // console.log('data')
    let pool = await sql.connect(config);
    const result=await pool.request()
    .input('ID',member.ID)
    .input('PayTypes',member.PayTypes)
    .input('Amount',member.Amount)
    .input('IsActive',member.IsActive)
    .execute(`Security.usp_addPricdeData`);
    return result.recordsets[0];
  } catch (error) {
    return error.message
  }

}
//#region 


///sample chat gpt code
async function executeQueries() {
  try {
    // Connect to the database
    await sql.connect(config);

    // Execute multiple queries
    const result1 = await sql.query`SELECT * FROM Table1`;
    const result2 = await sql.query`SELECT * FROM Table2`;

    // Organize results into an object
    const responseData = {
      list1: result1.recordset,
      list2: result2.recordset
    };

    // Return the object containing both lists
    return responseData;
  } catch (err) {
    // Handle errors
    console.error('Error executing queries:', err);
    throw err;
  } finally {
    // Close the connection
    await sql.close();
  }
}

// Usage
executeQueries()
  .then(responseData => {
    console.log('Response Data:', responseData);
    // Send responseData as a response to the client
  })
  .catch(error => {
    // Handle errors
    console.error('Error:', error);
    // Send an error response to the client
  });
///sample chat gpt code
//#endregion
module.exports = {
  getHubWisebooking:getHubWisebooking,
  savePriceData:savePriceData
}
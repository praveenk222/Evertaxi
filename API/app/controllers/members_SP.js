const { Pool } = require('pg');
const connectionString = 'postgresql://username:password@localhost:5432/mydatabase';

const pool = new Pool({
  connectionString: connectionString
});

pool.connect((err) => {
  if (err) {
    console.log('connection error', err.stack);
  } else {
    console.log('connected');
  }
});

// Assuming 'my_procedure' is your stored procedure
let procedureName = 'my_procedure';

pool.query(`CALL ${procedureName}($1, $2, $3)`, ['param1', 'param2', 'param3'], (error, results) => {
  if (error) {
    throw error;
  }
  console.log(results.rows);
  pool.end();
});
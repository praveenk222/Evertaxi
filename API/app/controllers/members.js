const { Client } = require('pg')
const { Pool } = require('pg');
const config=require('../config/db.config');


const poolc = new Pool({
    user: config.USER,
    host: config.HOST,
    database: config.DB,
    password: config.PASSWORD,
    port: config.port,
});





async function getUsers(req,res){debugger
    try {
        let pool=await poolc.connect();
        console.log('teste');
        const result = await pool.query('SELECT * FROM operation.member')
        console.log(result)
        console.log(result.rows)
        //result will give all  about table with data
        res.send(result.rows);

    } catch (err) {
        console.log(err.message);
        res.status(500).send('Internal Server Error')
    }
}
//this is the sample ex of sp calling using select statment (imp)
async function getUsersBYID(req,res){debugger
    console.log(req)
    try {
        let pool=await poolc.connect();
        console.log('teste',req);
        const result = await pool.query('SELECT * FROM getfoo(${id}) AS t1;')
        // console.log(result)
        // console.log(result.rows)
        //result will give all  about table with data
        res.send(result.rows);

    } catch (err) {
        console.log(err.message);
        res.status(500).send('Internal Server Error')
    }
}
async function getUsersSP(req,res){debugger
    let procedureName = 'my_procedure';

    pool.query(`CALL ${procedureName}($1, $2, $3)`, ['param1', 'param2', 'param3'], (error, results) => {
      if (error) {
        throw error;
      }
      console.log(results.rows);
      pool.end();
    });
}
//get by id
async function getCardsById(req,res) {
    try {
        console.log(req.params.id)
        // const query = {
        //     text: 'SELECT $1::text as first_name, $2::text as last_name',
        //     values: ['Brian', 'Carlson'],
        //     rowMode: 'array',
        //   }
        const query = {
            text: 'SELECT * FROM operation.member where userid= $1',
            values: [req.params.id],
            rowMode: 'array',
          }
        let pool=await poolc.connect();
        const id =req.params.id;
        console.log(req.params.id);
        const result = await pool.query(query)
        
      res.send(result.rows);
    }
    catch (er) {
        res.status(500).send(er.message)
    }

    // if (response.rowCount > 0) {
    //     res.status(200).send(response.rows);
    //  } else {
    //     res.status(404).send({ message: "No products found" });
    //  }
}
// let qery=`INSERT INTO operation.member(emailid, mobileno, password, firstname, lastname,	membertype, otp, isotpsent, otpsentdate, isresendotp, isotpverified, isemailverified,
// 	isactive, createdon, profilephoto, token, parentid, isregisteredbymobile)
// 	VALUES ( 'pp', '8519899222', '8519899222','tt', 'tt',
// 			21233, '2', true, CURRENT_TIMESTAMP,
// 			true, true, true, true, CURRENT_TIMESTAMP, 'rr', null, 23, true);`

            // const text = 'INSERT INTO users(name, email) VALUES($1, $2) RETURNING *'
            // const values = ['brianc', 'brian.m.carlson@gmail.com']
             
            // const res = await client.query(text, values)
            // console.log(res.rows[0])
  async function saveUsers(req,res){
    let status=false;
               console.log(req.body)
               let d=req.body;
                    try {
                        let qery=`INSERT INTO operation.member(emailid, mobileno, password, firstname, lastname,	membertype, otp, isotpsent, otpsentdate, isresendotp, isotpverified, isemailverified,
                            isactive, createdon, profilephoto, token, parentid, isregisteredbymobile)
                            VALUES ( $1, $2, $3,$4, $5,
                            $6, $7, $8, $9,
                                    $10, $11, $12, $13, $14, $15, $16, $17, $18);`
                     let pool=await poolc.connect();           // gets connection
                        const result=  pool.query( qery, [d.emailid,d.mobileno, d.password, d.firstname, d.lastname,d.membertype, d.otp, d.isotpsent, d.otpsentdate, d.isresendotp, 
                            d.isotpverified, d.isemailverified,
                            d.isactive,d. createdon, d.profilephoto, d.token, d.parentid,d.isregisteredbymobile]); // sends queries
                     console.log(result)
                     res.status(201).send(true);
                    } catch (error) {
                        console.error(error.stack);
                        res.status(500).send(error.stack);
                    } finally {
                        res.status(201).send(true);
                                       // closes connection
                    }
                };
            

module.exports = {
    getCards: getUsers,
    getCardsById:getCardsById,
    saveUsers:saveUsers
 
}
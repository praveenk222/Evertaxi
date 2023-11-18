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
        const result = await pool.query('select * from f_getallmembers()')
        console.log(result)
        console.log(result.rows)
        //result will give all  about table with data
        res.send(result.rows);

    } catch (err) {
        console.log(err.message);
        res.status(500).send(err.message)
    }
}
async function checkLogin(req,res){debugger
    try {
        let pool=await poolc.connect();
let item=req.body
        console.log(req.body);
        let query = `select * from checkusername ($1, $2, $3,$4)
        `
        const result = await pool.query(query,[item.emailid,item.password,item.mobileno,null])
        console.log(result)
        console.log(result.rows)
        //result will give all  about table with data
        res.send(result.rows);

    } catch (err) {
        console.log(err.message);
        res.status(500).send(err.message)
    }
}
async function fn_Login(req,res){debugger
    try {
        let pool=await poolc.connect();
let item=req.body
        console.log(req.body);
        let query = `select * from fn_Login ($1, $2, $3)
        `
        const result = await pool.query(query,[item.emailid,item.mobileno,item.password,])
        console.log(result)
        console.log(result.rows)
        //result will give all  about table with data
        res.send(result.rows);

    } catch (err) {
        console.log(err.message);
        res.status(500).send(err.message)
    }
}
//this is the sample ex of sp calling using select statment (imp)
async function getUsersBYID(req,res){debugger
    console.log(req)
    try {
        let pool=await poolc.connect();
        console.log('teste',req);
        const result = await pool.query('select * from fn_getallById(1000)')
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
    console.log('test',req);

    let procedureName = 'operation.transfer';


    try {
        let pool=await poolc.connect();
        console.log('teste');
     
        const result = await    pool.query(`CALL ${procedureName}($1, $2, $3,$4,$5,$6)`, ['344441','rrr','433000',null,null,null])
        console.log(result)
        console.log(result.rows)
        //result will give all  about table with data
        res.send(result.rows);

    } catch (err) {
        console.log(err.message);
        res.status(500).send(err.message)
    }
}
async function getallUsersSP(req,res){debugger
    console.log('test',req);



    let client=await poolc.connect();
    try {

        const { rows } = await client.query('CALL get_employees(null    )');
        console.log(rows);
      
        // Ensure you close the cursor after fetching results
      } finally {
        client.release();
      }
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

                //file upload to public folders..imp
                
            
 async  function  fileupload(req, res) {
                    // req.file is the name of your file in the form above, here 'uploaded_file'
                    // req.body will hold the text fields, if there were any 
                    console.log(req.file, req.body)
                    res.status(200).send(true)
                }
module.exports = {
    getCards: getUsers,
    getCardsById:getCardsById,
    saveUsers:saveUsers,
    getUsersSP:getUsersSP,
    checkLogin:checkLogin,
    login:fn_Login,
    fileupload:fileupload
 
}
var  express = require('express');
const fs=require('fs');
var  router = express.Router();
var  Db = require('../Orders/orders.service');


router.use((request, response, next) => {
    next();
  });
router.route('/orders').get((request, response) => {

    Db.getOrders().then((data) => {
      response.json(data[0]);
    })
  })
  
 router.route('/save').post((req,res)=>{
  try {
    
    Db.addOrder(req.body).then((data)=>{
      res.json(data)
    })
  } catch (error) {
    return error
  }
 })
 router.route('/orderbooking').post((req,res)=>{
  try {
    
    Db.Orderbooking(req.body).then((data)=>{
      console.log('datt',data)
      res.status(201).json(data);
    })
  } catch (error) {
    return error
  }
 })
 router.route('/getorderbyUserid/:id').get((req,res)=>{
   let data=req.params.id;
  Db.getOrderByUserID(data).then(data =>{
    res.status(200).json(data);
  })
})
 router.route('/getorderbyorderid/:id').get((req,res)=>{
   let data=req.params.id;
  Db.getOrderByOrderID(data).then(data =>{
    res.status(200).json(data);
  })
})
 router.route('/getordersummeryByorderid/:id').get((req,res)=>{
   let data=req.params.id;
  Db.getOrderSummeryByOrderID(data).then(data =>{
    res.status(200).json(data);
  })
})
 router.route('/getordersummeryByBookingNo').post((req,res)=>{
  console.log('tet',req.body)
  Db.getBookingSummaryByBookingID(req.body).then(data =>{
    res.status(200).json(data);
  })
})

module.exports = router;

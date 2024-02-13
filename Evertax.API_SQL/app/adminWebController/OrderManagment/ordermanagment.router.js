var  express = require('express');
const fs=require('fs');
var  router = express.Router();
var  Db = require('../OrderManagment/ordermanagment.service');


router.use((request, response, next) => {
    next();
  });
router.route('/:id').get((request, response) => {
  try {
    let id=request.params.id;
    
    Db.getOrders(id).then((data) => {
      response.json({"id":1,"status":true,"message":data});
    })
  } catch (error) {
    response.json({"id":0,"status":false,"message":error})
  }
   
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
    res.status(200).json({'status':false})
  }
 })
 router.route('/extendCurrentOrder').post((req,res)=>{
  try {
    
    Db.extendCurrentOrder(req.body).then((data)=>{
      res.status(201).json(data);
    })
  } catch (error) {
    res.status(200).json({'status':false})
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
 router.route('/gethubwisebookings').get((req,res)=>{
  console.log(req)
  Db.getHubWisebooking().then(data =>{
    res.status(200).json(data);
  })
});
router.route('/gets').get((request, response) => {
  try {
    let id=request.params.id;
    console.log(id)
    Db.getHubWisebooking().then((data) => {
      response.json({"id":133,"status":true,"message":data});
    })
  } catch (error) {
    response.json({"id":0,"status":false,"message":error})
  }
   
  })
 router.route('/getordersummeryByBookingNo').post((req,res)=>{
  console.log('tet',req.body)
  Db.getBookingSummaryByBookingID(req.body).then(data =>{
    console.log(data)
    res.status(200).json(data);
  })
})
 router.route('/test').post((req,res)=>{
  console.log('tet',req.body)
  Db.getUserCurrentBooking(req.body).then(data =>{
    res.status(200).json(data);
  })
})
//offres adn 
 router.route('/offers/getall').get((req,res)=>{
  Db.getAlloffersndcoupnss().then(data =>{
    res.status(200).json(data);
  })
})

module.exports = router;

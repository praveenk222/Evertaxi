const member = require("../users/users.service");
const express = require('express');
const router = express.Router();
const Joi = require('joi');


router.get('', member.getAll);
// router.get('/:id', getById);
// router.post('/', createSchema, create);
// router.put('/:id', updateSchema, update);
// router.delete('/:id', _delete);

module.exports = router;

router.use((request, response, next) => {
    console.log('middleware');
    next();
  });
   
   
  router.route('/orders').get((request, response) => {
    Db.getOrders().then((data) => {
      response.json(data[0]);
    })
  })
  
  router.route('/orders/:id').get((request, response) => {
    Db.getOrder(request.params.id).then((data) => {
      response.json(data[0]);
    })
  })
  
  router.route('/orders').post((request, response) => {
    let  order = { ...request.body }
    Db.addOrder(order).then(data  => {
      response.status(201).json(data);
    })
  })
    
    
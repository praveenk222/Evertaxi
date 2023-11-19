const member = require("../users/users.service");
const express = require('express');
const router = express.Router();
const Joi = require('joi');


router.get('/', member.getAll);
// router.get('/:id', getById);
// router.post('/', createSchema, create);
// router.put('/:id', updateSchema, update);
// router.delete('/:id', _delete);

module.exports = router;
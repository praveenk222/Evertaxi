const express = require('express')
const router = express.Router();
const member = require("../controllers/members");

router.get('/',member.getCards)
router.get('/:id',member.getCardsById)

router.post('/save',member.saveUsers),
router.post('/Login',member.login),
// router.post('/Login',member.checkLogin),
router.get('/getsp',member.getUsersSP)
module.exports = router;
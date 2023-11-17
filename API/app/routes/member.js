const express = require('express')
const router = express.Router();
const member = require("../controllers/members");

router.get('/',member.getCards)
router.get('/:id',member.getCardsById)

router.post('/save',member.saveUsers)
router.get('/getsp',member.getUsersSP)
module.exports = router;
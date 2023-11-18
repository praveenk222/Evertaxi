const express = require('express')
const router = express.Router();
const member = require("../controllers/members");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.get('/',member.getCards)
router.get('/:id',member.getCardsById)

router.post('/save',member.saveUsers),
router.post('/Login',member.login),
// router.post('/Login',member.checkLogin),
router.post('/upload', upload.single('uploaded_file'),member.fileupload),
router.get('/getsp',member.getUsersSP)
module.exports = router;
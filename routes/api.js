const express = require("express");
const cors = require("cors")
const router = express.Router();
const apiCtrl = require("../controllers/api")
let passport = require('passport');


router.get("/create/reminder/:num", cors(), apiCtrl.createReminderData)
router.get('/category/:category', cors(), apiCtrl.getCategoryData)
router.post('/checkbox', cors(), apiCtrl.changeCheckbox)
module.exports = router;

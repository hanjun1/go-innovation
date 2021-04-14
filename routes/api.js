const express = require("express");
const cors = require("cors")
const router = express.Router();
const apiCtrl = require("../controllers/api")
let passport = require('passport');


router.get("/create/reminder/:num", cors(), apiCtrl.isLoggedIn, apiCtrl.createReminderData)
router.get('/category/:category', cors(), apiCtrl.isLoggedIn, apiCtrl.getCategoryData)
// router.post('/medications', cors(), apiCtrl.isLoggedIn, apiCtrl.getCategoryData)


module.exports = router;

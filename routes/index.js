var express = require("express");
var router = express.Router();
let indexCtrl = require("../controllers/index");

/* GET home page. */
router.get("/", indexCtrl.index);
router.post("/fillForm", indexCtrl.fillForm);

module.exports = router;

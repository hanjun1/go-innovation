var express = require("express");
var router = express.Router();
var db = require('../models/');
var Users = db.User;
const Threads = db.Threads
// sequelize.User = sequelize.import('../models/User')
let indexCtrl = require("../controllers/index");


function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
      return next()
  }
  res.redirect("/auth/google");
}

router.get('/success', async function(req, res) {
  if(req.user){
    
    res.send("success")  
  }else{
    res.send("fail")  
  }
});
router.get('/failure', async function(req, res, next) {
  res.send("failure");
});


router.get('/test-thread', async function(req, res, next) {
    try{
      await Threads.create({
        user1: 1,
        user2: 2
    })
    }catch(err){
      console.log(err)
    }
  
    
    res.send("Hello, World");
  });



/* GET home page. */
router.get("/", indexCtrl.index);
router.post("/fillForm", indexCtrl.fillForm);

module.exports = router;

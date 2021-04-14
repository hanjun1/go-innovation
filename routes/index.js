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
router.get('/success', isLoggedIn, function(req, res, next) {
  res.send("success")
});
router.get('/failure', function(req, res, next) {
  res.send("failure");
});


router.get('/test', async function(req, res, next) {
  try{
    await db.Reminder.create({
      settings: "blah",
      title: "A Reminder Title",
      description: "A description of a reminder",
      category: "appt",
      userId: 1,
      authorId: 1,
    })
  }catch(err){
    console.log(err)
  }

  
  res.send("Hello, World");
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

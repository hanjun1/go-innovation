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
  res.render('demo');
});
router.get('/failure', function(req, res, next) {
  res.send("failure");
});


router.get('/test', async function(req, res, next) {
  try{
    await Users.create({
      firstName: "Fred",
      lastName: "Dead",
      displayName: "Fred",
      avatar: "http://placekitten.com/200/300",
      email: "fred@fred.com",
      googleId: "123456789"})
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

router.get("/bt", (req, res) => {
    res.render("bt")
})


/* GET home page. */
router.get("/", indexCtrl.index);
router.post("/fillForm", indexCtrl.fillForm);

module.exports = router;

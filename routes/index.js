var express = require("express");
var router = express.Router();
let passport = require('passport');
var sequelize = require('../config/database')
var Users = sequelize.models.User;
let indexCtrl = require("../controllers/index");

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
      return next()
  }
  res.redirect("/auth/google");
}


router.get('/success', isLoggedIn, function(req, res, next) {
  res.send("SUCCESS");
});
router.get('/failure', function(req, res, next) {
  res.send("failure");
});


router.get('/test', function(req, res, next) {
  Users.create({
    // Model attributes are defined here
    firstName:"Fred",
    lastName: "Flinstone",
    avatar: "https://placekitten.com/200/300",
    email: "fred@isdead.com",
    googleId: "1234567890",
  })
  res.send("Hello, World");
});


/* GET home page. */
router.get("/", indexCtrl.index);

module.exports = router;

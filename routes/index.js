var express = require('express');
var router = express.Router();
var sequelize = require('../config/database').sequelize
var Users = sequelize.models.User;
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Remind' });
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

module.exports = router;

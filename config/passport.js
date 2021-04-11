const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var sequelize = require('../config/database').sequelize
var Users = sequelize.models.User;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
  },
  function(accessToken, refreshToken, profile, cb) {
    Users.findOne({ where: {'googleId': profile.id} }, function(err, user) {
      console.log(profile)
      if (err) return cb(err);
      if (user) {
        return cb(null, user);
      } else {
        var newStudent = new Users({
          displayName: profile.displayName,
          email: profile.emails[0].value,
          googleId: profile.id
        });
        newStudent.save(function(err) {
          if (err) return cb(err);
          return cb(null, newStudent);
        });
      }
    });
  }
));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    Users.findById(id, function(err, user) {
      done(err, user);
    });
  });
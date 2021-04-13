const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var db = require('../models')
var Users = db.User
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
  },
  async function(accessToken, refreshToken, profile, cb) {
    try{
      let thisUser = await Users.findOne({ where: {'googleId': profile.id} });
      if (thisUser){
        return cb(null, thisUser);
      }else{
        Users.create({
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          displayName: profile.displayName,
          avatar: profile.photos[0].value,
          email: profile.emails[0].value,
          googleId: profile.id
        })
      }
    }catch(err){
      return cb(err);
    }
  }
));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(async function(id, done) {
  try{
    let thisUser = await Users.findByPk(id)
    done(null, thisUser)
  }catch(err){
    done(err)
  }
  });
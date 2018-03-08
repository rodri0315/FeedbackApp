const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('users');
const keys = require('../config/dev');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log(id);
})

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id })
        .then((existingUser) => {
          if(existingUser) {
            // we already have a record with the given profile ID
            done(null, existingUser)
          } else {
            // we don't have a user record with this ID, make a new record!
            new User({ googleId: profile.id })
              .save()
              .then((user) => done(null, user));
          }
        });
    }
  )
);
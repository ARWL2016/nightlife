/**
 * Configures passport with the Google OAuth2 Strategy
 * 
 * @function serializeUser - this method saves the user object (or part of it) into 
 * the session object. If we pass user.id to the done() method, then only the id will 
 * be serialized
 * 
 * @function deserializeUser - this is called with the same property saved to the session 
 * which can then be used to get the whole user object from the database. 
 * 
 * {@link https://console.developers.google.com/apis/credentials?project=nightlife-1509443022907 | Google Dev Console} 
 * {@link https://developers.facebook.com/apps/142230009738845/dashboard/ | Facebook Dev Console} 
 * Configure Google Sign in 
 * 
 * NB Profile.id returned from FB varies - do not use for db find 
 */

const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;

const { User } = require('../db');
const { fb, google, twitter } = require('./auth.config');

function configPassport(passport) {
  passport.serializeUser((user, done) => {
    console.log('SERIALIZE');
    console.log({user});
    done(null, user);
  }); 

  passport.deserializeUser((id, done) => {
    console.log({id});
    User.findById(id)
      .then(user => {
        console.log('DESERIALIZE');
        console.log({user});
        done(null, user);
      })
      .catch(err => {
        done(err);
      })
  }); 

  passport.use(new GoogleStrategy(google, registerGoogleUser));
  // passport.use(new FacebookStrategy(fb, registerUserWithProvider('facebookId')));
  passport.use(new TwitterStrategy(twitter, registerTwitterUser));
  // console.log({twitter});
}

function registerTwitterUser(token, tokenSecret, profile, done) {
  console.log('VERIFY CALLBACK');
console.log({profile});
  process.nextTick(function() {
    User.findOne({twitterId: profile.id})
      .then(user => {
        console.log({user});
        if (user) {
          return done(null, user);
        } else {
          const newUser = new User({
            twitterId: profile.id, 
            displayName: profile.displayName, 
            token: token
          }); 
          return newUser.save();
        }
      })
      .then(createdUser => {
        done(null, createdUser);
      })  
      .catch(e => done(e));
  })
}

function registerGoogleUser(accessToken, refreshToken, profile, done) {

  process.nextTick(function() {
    User.findOne({displayName: profile.displayName})
      .then(user => {
        if (user) {
          return done(null, user);
        } else {
          const newUser = new User({
            googleId: profile.id, 
            displayName: profile.displayName, 
            token: accessToken
          }); 
          return newUser.save();
        }
      })
      .then(createdUser => done(null, createdUser))
      .catch(e => done(e));
  })
}

module.exports = { configPassport };
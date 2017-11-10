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
 */

const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

const { User } = require('../db');
const { fb, google } = require('./index');

function configPassport(passport) {
  passport.serializeUser((user, done) => {
    console.log('serialize', user);
    done(null, user.id);
  }); 

  passport.deserializeUser((id, done) => {
    User.findById(id)
      .then(user => {
        console.log('deserialize', user);
        done(null, user);
      })
      .catch(err => {
        done(err);
      })
    
  }); 

  passport.use(new GoogleStrategy(google, registerUserWithProvider('googleId')));
  passport.use(new FacebookStrategy(fb, registerUserWithProvider('facebookId')));
}

function registerUserWithProvider(idProperty) {
  function registerUser(accessToken, refreshToken, profile, done) {
    console.log({profile});
    console.log({accessToken});

    process.nextTick(function() {
      User.findOne({[idProperty]: profile.id})
        .then(user => {
            if (user) return done(null, user);
            else {
              const newUser = new User({
                facebookId: profile.id, 
                displayName: profile.displayName, 
                token: accessToken
              }); 
              return newUser.save();
            }
          }).then(createdUser => {
            return done(null, createdUser); 
          }).catch(e => {
            return done(e);
          });
    })
  }

  return registerUser;
}


module.exports = { configPassport };
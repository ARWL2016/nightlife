/**
 * Configures passport with the Google OAuth2 Strategy
 * 
 * @function serializeUser - this method saves the user object (or part of it) into 
 * the session object. If we pass user.id to the done() method, then only the id will 
 * be serialized
 * 
 * @function deserializeUser - this is called with the same property saved to the session 
 * and this property can then be used to get the whole user object from the database. 
 */

 const GoogleStrategy = require('passport-google-oauth20').Strategy;
 const FacebookStrategy = require('passport-facebook').Strategy;
 const {User} = require('../db');

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

    passport.use(new GoogleStrategy({
      clientID: process.env.GOOGLE_OAUTH_CLIENT_ID, 
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET, 
      callbackURL: '//localhost:3000/auth/google/callback'
    }, 
    function (accessToken, refreshToken, profile, cb) {
      return cb(null, {
        profile, 
        accessToken
      });
    }));

    passport.use(new FacebookStrategy({
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: "//localhost:3000/auth/facebook/callback", 
      // these are standard passport return fields
      profileFields: ["id", "displayName", "photos"]
    },
    function(accessToken, refreshToken, profile, done) {
      console.log({profile});
      console.log({accessToken});

      process.nextTick(function() {
        User.findOne({facebookId: profile.id})
        .then(user => {
          if (user) {
            return done(null, user);
          } else {
            const newUser = new User({
              facebookId: profile.id, 
              displayName: profile.displayName, 
              token: accessToken
            }); 
            newUser.save()
              .then((createdUser) => {
                console.log({createdUser});
                return done(null, newUser);
              })
              .catch(err => {
                throw err;
              });
          }
        })
        .catch(e => {
          return done(e);
        });
      })

     

    }
  ));
 };

 module.exports = {configPassport};
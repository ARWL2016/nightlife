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

 function configPassport(passport) {
    passport.serializeUser((user, done) => {
      done(null, user);
    }); 

    passport.deserializeUser((user, done) => {
      done(null, user);
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
      clientID: '142230009738845',
      clientSecret: 'b61e6fdd97366d16c4ecb9f9b4afef7c',
      callbackURL: "//localhost:3000/auth/facebook/callback", 
      // these are standard passport return fields
      profileFields: ["id", "displayName", "photos"]
    },
    function(accessToken, refreshToken, profile, cb) {
      User.findOrCreate({ facebookId: profile.id }, function (err, user) {
        return cb(err, user);
      });
    }
  ));
 };

 module.exports = {configPassport};
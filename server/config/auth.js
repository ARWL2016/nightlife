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
      callbackURL: 'http://localhost:3000/auth/google/callback'
    }, 
    function (accessToken, refreshToken, profile, cb) {
      return cb(null, {
        profile, 
        accessToken
      });
    }));
 };

 module.exports = {configPassport};
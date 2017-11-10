module.exports = {
  fb: {
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: "//localhost:3000/auth/facebook/callback", 
    // these are standard passport return fields
    profileFields: ["id", "displayName", "photos"]
  }, 
  google: {
    clientID: process.env.GOOGLE_OAUTH_CLIENT_ID, 
    clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET, 
    callbackURL: '//localhost:3000/auth/google/callback', 
    profileFields: ["id", "displayName"]
  }
}; 


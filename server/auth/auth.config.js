// configuration for google and facebook O-Auth strategies

module.exports = {
  fb: {
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL, 
    // these are standard passport return fields
    profileFields: ["id", "displayName", "photos"]
  }, 
  google: {
    clientID: process.env.GOOGLE_OAUTH_CLIENT_ID, 
    clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET, 
    callbackURL: process.env.GOOGLE_CALLBACK_URL, 
    profileFields: ["id", "displayName"]
  }, 
  twitter: {
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: process.env.TWITTER_CALLBACK_URL, 
  }, 
  github: {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL
  }
}

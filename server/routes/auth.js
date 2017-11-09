const url = require('url');

module.exports = (app, passport) => {

  app.get('/auth/google', 
    passport.authenticate('google', { scope: ['profile'] }));

  app.get('/auth/google/callback', 
    passport.authenticate('google', { 
      failureRedirect: '/', 
      successRedirect: '/search'
    }));
    

  // facebook 
  app.get('/auth/facebook',
    passport.authenticate('facebook'));

  app.get('/auth/facebook/callback',
    passport.authenticate('facebook'),
    function(req, res) {
      console.log(req.user);
      const {displayName, token} = req.user;
      res.redirect(`/#!/profile/?name=${displayName}&token=${token}`);

    });


}
/**
 * Passport configuration requires two routes: 
 * /auth/[provider] - called from href on front end; the passport authenticate method then redirects to the social login page
 * /auth/[provider]/callback - after login, the provider will redirect to this route with the user information
 */

module.exports = (app, passport) => {

  // google
  app.get('/auth/google', 
    passport.authenticate('google', { scope: ['profile'] }));

  app.get('/auth/google/callback', 
    passport.authenticate('google'),
    function(req, res) {
      const {displayName, token} = req.user;
      res.redirect(`/#!/profile/?name=${displayName}&token=${token}`);
    });
    

  // facebook 
  app.get('/auth/facebook',
    passport.authenticate('facebook'));

  app.get('/auth/facebook/callback',
  // TODO: need an error redirect here
    passport.authenticate('facebook'),
    function(req, res) {
      const {displayName, token} = req.user;
      res.redirect(`/#!/profile/?name=${displayName}&token=${token}`);
    });

  app.get('/auth/logout', function(req, res){
    req.logout();
    res.redirect('/#!/profile');
  });

}
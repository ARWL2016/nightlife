/**
 * Passport configuration requires two routes: 
 * /auth/[provider] - called from href on front end; the passport authenticate method then redirects to the social login page
 * /auth/[provider]/callback - after login, the provider will redirect to this route with the user information
 */

module.exports = (app, passport) => {

  function successRedirect(req, res) {
    const {displayName, token} = req.user;
    // console.log(req.user);
    res.redirect(`/#!/profile/?name=${displayName}&token=${token}`);
  }

  // google
  app.get('/auth/google', 
    passport.authenticate('google', { scope: ['profile'] }));

  app.get('/auth/google/callback', 
    passport.authenticate('google'),
    successRedirect
    // function(req, res) {
    //   const {displayName, token} = req.user;
    //   console.log('SUCCESS REDIRECT');
    //   console.log(req.session.passport.user);
    //   res.redirect(`/#!/profile/?name=${displayName}&token=${token}`);
    // }
  );

    // twitter 
    app.get('/auth/twitter',
      passport.authenticate('twitter'));

    app.get('/auth/twitter/callback', 
      passport.authenticate('twitter', { failureRedirect: '/#!/login' }),
      successRedirect);

    // github 
    app.get('/auth/github',
    passport.authenticate('github'));

    app.get('/auth/github/callback', 
      passport.authenticate('github', { failureRedirect: '/#!/login' }),
      successRedirect);
    

  // facebook 
  // app.get('/auth/facebook',
  //   passport.authenticate('facebook'));

  // app.get('/auth/facebook/callback',
  // // TODO: need an error redirect here
  //   passport.authenticate('facebook'),
  //   function(req, res) {
  //     const {displayName, token} = req.user;
  //     res.redirect(`/#!/profile/?name=${displayName}&token=${token}`);
  //   });

  app.get('/auth/logout', function(req, res){
    req.logout();
    res.redirect('/#!/profile');
  });

}
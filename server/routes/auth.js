

module.exports = (app, passport) => {

  app.get('/auth/google', 
    passport.authenticate('google', { scope: ['profile'] }));

  app.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/'}), 
    function(req, res) {
      res.send('SUCCESS');
    });

  // facebook 
  app.get('/auth/facebook',
    passport.authenticate('facebook'));

  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/' }),
    function(req, res) {
      // Successful authentication, redirect home.
      console.log('SUCCESS')
      res.send('SUCCESS');
    });

  }
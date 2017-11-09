require('dotenv').config();

const express =   require('express');
const passport =  require('passport');
const winston =   require('winston');
const path =      require('path');
const fs =        require('fs');

const cookieParser = require('cookie-parser'); 
const bodyParser = require('body-parser');
const session = require('express-session');

const api = require('./server/api');

const {configPassport} = require('./server/config/auth');
configPassport(passport);

const app = express();

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

const port = process.env.PORT || 3000; 

app.use(express.static(path.join(__dirname, 'app')));

app.use(cookieParser());

// parse request body and add to req.body
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
  secret: 'keyboard cat', 
  resave: true, 
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.sendFile('./app/index.html');
})

// auth routes 
app.get('/auth/google', 
  passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/'}), 
  function(req, res) {
    res.send('SUCCESS');
  });

// development text-search data
// app.get('/api/data/info?', (req, res) => {
//   const data = fs.readFileSync(path.join(__dirname, '/ref/text-search.json'), 'utf8'); 
//   res.send(data);
// });

// production text search route
app.get('/api/data/info?', api.textSearch);


// details - DEV
// app.get('/api/data/details?', (req, res) => {
//   const data = fs.readFile(path.join(__dirname, '/ref/ledbury-details.json'), 'utf8', (err, data) => {
//     if (err) console.log(err); 
//     else {
//       res.send(data);
//     }
//   });
// });

// details route - PROD
app.get('/api/data/details?', api.getDetails);

app.get('/api/data/location?', api.getLocation);

// photorequestroute
app.get('/api/data/photo?', api.getPhoto);



app.listen(port, () => {
  winston.log('info', `Listening on PORT: ${port}`);
  
});
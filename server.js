require('dotenv').config();

const express =   require('express');
const passport =  require('passport');
const winston =   require('winston');
const path =      require('path');
const fs =        require('fs');

const cookieParser = require('cookie-parser'); 
const bodyParser = require('bodyParser');
const session = require('express-session');

const api = require('./server/api');
const auth = require('./auth');

const app = express();
const port = process.env.PORT || 3000; 

app.use(express.static(path.join(__dirname, 'app')));
// read cookie from header and add to req.cookie
app.use(cookieParser('keyboard cat'));
// parse request body and add to req.body
app.use(bodyParser).urlencoded({extended: true});
app.use(session({
  secret: 'keyboard cat', 
  resave: true, 
  saveUninitialized: true
}))

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
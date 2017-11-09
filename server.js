require('dotenv').config();

const express =   require('express');
const passport =  require('passport');

const winston =   require('winston');
const path =      require('path');
const fs =        require('fs');

const cookieParser = require('cookie-parser'); 
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const { mongoose } = require('./server/db');
require('./server/config/auth').configPassport(passport);

const app = express();
const port = process.env.PORT || 3000; 

app.use(express.static(path.join(__dirname, 'app')));

app.use(cookieParser());
// parse request body and add to req.body
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
  secret: 'keyboard cat', 
  resave: true, 
  saveUninitialized: true, 
  store: new MongoStore({mongooseConnection: mongoose.connection})
}));

app.use(passport.initialize());
app.use(passport.session());

// import routes
require('./server/routes/auth')(app, passport);
require('./server/routes/data')(app);

app.listen(port, () => {
  winston.log('info', `Listening on PORT: ${port}`);
  // console.log(process.env);
});
if (process.env.NODE_ENV === 'development') {
  require('dotenv').config();
}

const express = require('express');
const passport = require('passport');

const fs = require('fs');
const path = require('path');

const cookieParser = require('cookie-parser'); 
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const {logger} = require('./server/config/logger');
const { mongoose } = require('./server/db');
require('./server/config/auth').configPassport(passport);

const app = express();
const port = process.env.PORT || 3000; 
const appDirectory = path.join(__dirname, 'client/dist');
const libDirectory = path.join(__dirname, 'client/bower_components');

app.use(express.static(appDirectory));
app.use(express.static(libDirectory));

// app.use(cookieParser());
// parse request body and add to req.body
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
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
require('./server/routes/diary')(app);

app.listen(port, () => {
  logger.log('info', `SERVER PORT: ${port}`);
  logger.log('info', `SERVING APP FROM: ${appDirectory}`);
  logger.log('info', `SERVING LIB FROM: ${libDirectory}`);
  logger.log('info', `NODE_ENV: ${process.env.NODE_ENV}`);
});
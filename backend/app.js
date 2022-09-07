var createError = require('http-errors');
var express = require('express');//
const {authMiddleware} = require("./auth-middleware");
//const {getRole} = require("./auth-middleware");

var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


//
var donationRouter=require('./routes/donation');
var dR=require('./routes/d')
var indexRouter = require('./routes/index');//22
var usersRouter = require('./routes/users');//23
var ngoRouter=require('./routes/ngo')
var eventsRouter=require('./routes/event')
var usersRouter1 = require('./routes/user1');//23
var roleRouter=require('./routes/role');
//var Router=require(getRole);



var app = express();//

// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use("/", authMiddleware);

app.use('/api/v1/user', usersRouter1);
app.use('/api/v1/donation',donationRouter);

app.use("/api/v1/d",dR)
app.use("/api/v1/ngo",ngoRouter)
app.use("/api/v1/event",eventsRouter)
app.use("/api/v1/role",roleRouter);//to get role and also to 



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

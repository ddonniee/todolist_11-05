var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser')
var logger = require('morgan');

var indexRouter = require('./routes/index');
var dailyRouter = require('./routes/daily');
var weeklyRouter = require('./routes/weekly');
var monthlyRouter = require('./routes/monthly');
var yearlyRouter = require('./routes/yearly');
var bucketListRouter = require('./routes/bucket-list');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile)

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')));

// router
app.use('/', indexRouter);
app.use('/daily', dailyRouter);
app.use('/weekly', weeklyRouter);
app.use('/monthly', monthlyRouter);
app.use('/yearly', yearlyRouter);
app.use('/bucketlist', bucketListRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error.html');
});

module.exports = app;

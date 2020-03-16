const createError = require('http-errors');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('./configs/mongo');
const cors = require('cors');
const verifyAdminToken = require('./VerifyAdminToken');

const indexRouter = require('./routes/index');
const getAllCategoriesRouter = require('./routes/getAllCategories');
const getCategoryArrayRouter = require('./routes/getCategoryArray');
const getSingleProductRouter = require('./routes/getSingleProduct');
const registrationRouter = require('./routes/registration');
const loginRouter = require('./routes/login');
const checkOutRouter = require('./routes/checkOut');
const adminRouter = require('./routes/admin');

const app = express();
app.use('/images', express.static('images'));
app.use(bodyParser.json());
app.use(cors());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/registration', registrationRouter);
app.use('/login', loginRouter);
app.use('/getAllCategories', getAllCategoriesRouter);
app.use('/getCategoryArray', getCategoryArrayRouter);
app.use('/getSingleProduct', getSingleProductRouter);
app.use('/checkout', checkOutRouter);
app.use('/admin', verifyAdminToken.verifyAdminToken, adminRouter);

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

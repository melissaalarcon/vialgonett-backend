var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('dotenv').config();
var session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/admin/login');
var adminRouter = require('./routes/admin/novedades');
const { execFileSync } = require('child_process');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// !! EL CODIGO DE SESION siempre va ARRIBA de la llamada a las rutas
app.use(session({
  secret: 'VG2023bdac0410+/',
  cookie: {maxAge: null},
  resave: false,
  saveUninitialized: true
}));

secured = async(req, res, next) => {
    try {
      console.log(req.session.id_user);
      if(req.session.id_user) {
        next();
      } else {
        res.redirect('/admin/login');
      } // close ELSE
    } catch (error) {
        console.log(error);
    } // close CATCH
} // close SECURED

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin/login', loginRouter);
app.use('/admin/novedades', secured, adminRouter);

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

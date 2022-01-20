var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const indexRouter = require('./routes/index');
const doctorRouter = require('./routes/doctorRoute');
const patientRouter = require('./routes/patientRoute');
const appointmentRouter = require('./routes/appointmentRoute');
const specializationRouter = require('./routes/specializationRoute');
const sequelizeInit = require('./config/sequelize/init');
const patientApiRouter = require('./routes/api/PatientApiRoute');
const doctorApiRouter = require('./routes/api/DoctorApiRoute');
const specializationApiRouter = require('./routes/api/SpecializationApiRoute');
const appointmentApiRouter = require('./routes/api/AppointmentApiRoute');
const session = require('express-session');
const authUtils = require("./util/authUtil");
const i18n = require('i18n');
i18n.configure({
  locales: ['pl', 'en'], // języki dostępne w aplikacji. Dla każdego z nich należy utworzyć osobny słownik
  directory: path.join(__dirname, 'locales'), // ścieżka do katalogu, w którym znajdują się słowniki
  objectNotation: true, // umożliwia korzstanie z zagnieżdżonych kluczy w notacji obiektowej
  cookie: 'klinika-lang', //nazwa cookies, które nasza aplikacja będzie wykorzystywać do przechowania informacji o
  //języku aktualnie wybranym przez użytkownika
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cookieParser('secret'));
app.use(i18n.init);
app.use(cookieParser('klinika-lang'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'my_secret_password',
  resave: false
}));
app.use((req,res,next) => {
  const loggedUser = req.session.loggedUser;
  res.locals.loggedUser = loggedUser;
  if(!res.locals.loginError) {
    res.locals.loginError = undefined;
  }
  next();
});
app.use((req, res, next) => {
  if(!res.locals.lang) {
    res.locals.lang = req.cookies['klinika-lang'];
  }
  next();
});

app.use('/', indexRouter);
app.use('/doctors', authUtils.permitAuthenticatedUser,doctorRouter);
app.use('/patients', authUtils.permitAuthenticatedUser,patientRouter);
app.use('/appointments', authUtils.permitAuthenticatedUser,appointmentRouter);
app.use('/specializations', authUtils.permitAuthenticatedUser,specializationRouter);
app.use('/api/patients', patientApiRouter);
app.use('/api/doctors', doctorApiRouter);
app.use('/api/appointments', appointmentApiRouter);
app.use('/api/specializations', specializationApiRouter);

sequelizeInit().catch(err => {
  console.log(err);
})
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

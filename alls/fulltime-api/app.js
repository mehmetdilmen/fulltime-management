const createError = require('http-errors');
const express = require('express');
const cors = require('cors');

const users = require('./routes/users');
const multer = require('multer');
const students = require('./routes/students');
const classes = require('./routes/classes');
const personal = require('./routes/personal');


const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, 'uploads')
  },
  filename: (req, file, callBack) => {
    callBack(null, `fitnesswow_${file.originalname}`)
  }
});


const upload = multer({storage: storage});


var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');

var app = express();

//db
const db = require('./helper/db.js')();

// Add headers
app.use(cors());
app.options('*', cors());

// Config
const config = require('./config');
app.set('api_secret_key', config.api_secret_key);

// Middleware
const verifyToken = require('./middleware/verify-token');

function requireRole(role) {
  return function (req, res, next) {
    if (req.session.user && req.session.user.role === role) {
      next();
    } else {
      res.send(403);
    }
  }
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', verifyToken);
app.use('/api/users', users);
app.use('/api/student', students);
app.use('/api/classes', classes);
app.use('/api/personal', personal);




app.post('/file', upload.single('file'), (req, res, next) => {
  const file = req.file;
  console.log(file.filename);
  if (!file) {
    const error = new Error('No File')
    error.httpStatusCode = 400
    return next(error)
  }
  res.send(file);
})

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
  res.render('error');
});

module.exports = app;

const express       = require('express');

const path          = require('path');
const favicon       = require('serve-favicon');
const logger        = require('morgan');

const cookieParser  = require('cookie-parser');
const bodyParser    = require('body-parser');
const cors          = require('cors');

/* Routes */
const routes        = require('./routes/index');
const games         = require('./routes/games');
const reports       = require('./routes/reports');

const app           = express();

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());

app.use('/'     ,   routes);
app.use('/games',   games);
app.use('/reports', reports);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
// no stacktraces leaked to user unless in development environment
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message : err.message,
    error   : (app.get('env') === 'development') ? err : {}
  });
});

module.exports = app;

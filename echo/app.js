var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
// const swaggerUi = require('swagger-ui-express');  // it will be added someday
// const swaggerJSDoc = require('swagger-jsdoc');
// const swaggerDocument = require('./swagger.json');
var result = require('dotenv').config({ path: '../.env' });

var app = express();

if (result.error) {
  throw result.error;
}
console.log(result.parsed);

mongoose.connect(process.env.MONGO_DB_ADDRESS, {useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("mongodb is connected");  // we're connected!
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(require("./api"))
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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

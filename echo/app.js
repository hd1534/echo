var createError = require("http-errors");
var express = require("express");
// var path = require("path");
var cookieParser = require("cookie-parser");
// const swaggerUi = require('swagger-ui-express');  // it will be added someday
// const swaggerJSDoc = require('swagger-jsdoc');
// const swaggerDocument = require('./swagger.json');

if (process.env.RUNNIG_ENV != "server") {
  var result = require("dotenv").config({ path: "../.env" });
  if (result.error) {
    throw result.error;
  }
  console.log(result.parsed);
}

var mongoDB = require("./mongo").connectMongo(process.env);
var sqlDB = require("./models/sql").sequelize;
sqlDB.sync(); // 테이블 확인 후 동기화 (자동 생성)

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(require("./api"));
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only provi-ding error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error")
  // res.send("error");
});

module.exports = app;

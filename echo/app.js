var createError = require("http-errors");
var express = require("express");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var fileUpload = require("express-fileupload");
var bearerToken = require("express-bearer-token");
// var path = require("path");
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

// var mongoDB = require("./mongo").connectMongo(process.env);  설정 다 되어있으니 필요하면 주석해제 할것.
var sqlDB = require("./models/sql").sequelize;
sqlDB.sync(); // 테이블 확인 후 동기화 (자동 생성)

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(fileUpload());
app.use(logger("dev"));
app.use(cookieParser());
app.use(
  bearerToken({
    bodyKey: false,
    queryKey: false,
    headerKey: "Bearer",
    reqKey: false,
    cookie: false, // by default is disabled
  })
);

app.use(require("./api"));
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  console.error(err);

  // instanceof 사용하도록 바꾸기
  // sequelize
  if (err.name == "SequelizeValidationError")
    return res.status(400).send(err.errors.map((err) => err.message));
  if (err.name == "SequelizeDatabaseError")
    return res.status(400).send(err.parent.sqlMessage);

  // jwt
  if (err.name == "TokenExpiredError") return res.status(401).send(err);
  if (err.name == "JsonWebTokenError") return res.status(401).send(err);
  if (err.name == "NotBeforeError") return res.status(401).send(err);

  // only provi-ding error in development
  res.status(err.status || 500);
  res.send(req.app.get("env") === "development" ? err : "ERROR");
});

module.exports = app;

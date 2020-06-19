"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
require("dotenv").config({ path: "../.env" });

const env = process.env;

if (!(env.PASSWORD && env.DATABASE && env.HOST)) {
  throw new Error(".env가 이상해유: " + env.PASSWORD + env.DATABASE + env.HOST);
}

const db = {};
const config = {
  username: "root",
  password: env.PASSWORD,
  database: env.DATABASE,
  host: env.HOST,
  dialect: "mysql",
  define: {
    // true로 설정하면 쿼리에 default로 createdAt과 updatedAt을 날림
    timestamps: false,  
  },
  operatorsAliases: false,
  logging: console.log,
};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

try {
  sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

db.EchoTags = require("./echo_tags")(sequelize, Sequelize);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

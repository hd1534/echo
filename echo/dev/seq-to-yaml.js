var Model = require("../models/sql/users");
// 위에 원하는 걸로

const {
  JsonSchemaManager,
  OpenApi3Strategy,
} = require("@alt3/sequelize-to-json-schemas");
const json_to_YAML = require("json-to-pretty-yaml");
var fs = require("fs");

const Sequelize = require("sequelize");
const sequelize = new Sequelize("database", "username", "password", {
  username: "env.SQL_DB_USER",
  password: "env.SQL_DB_PASSWORD",
  database: "env.SQL_DB_NAME",
  host: "env.SQL_DB_ADDRESS",
  dialect: "mysql",
});

const schemaManager = new JsonSchemaManager({
  baseUri: "/",
  absolutePaths: true,
  secureSchemaUri: true,
  disableComments: true,
});

schema = schemaManager.generate(
  Model(sequelize, Sequelize),
  new OpenApi3Strategy()
);

fs.writeFile(
  "./dev/seq-to-yaml.yaml",
  json_to_YAML.stringify(schema),
  function (err) {
    if (err) throw err;
    console.log("Saved!");
  }
);

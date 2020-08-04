const schema = require("../models/mongo/user");
// 위에 원하는 걸로

var fs = require("fs");
const json_to_YAML = require("json-to-pretty-yaml");
const m2s = require("mongoose-to-swagger");

fs.writeFile(
  "./dev/mon-to-yaml.yaml",
  json_to_YAML.stringify(m2s(schema)),
  function (err) {
    if (err) throw err;
    console.log("Saved!");
  }
);

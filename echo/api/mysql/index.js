var express = require("express");
var router = express.Router();
const { EchoTags } = require("../../models/sql");

router.get("/", (req, res) => {
  const tags = EchoTags.findAll({ attributes: ["idx", "name"] });
  tags.then((result) => {
    if (!result) {
      res.send("ERRORRRRRRR");
    } else res.send(result);
  });
});

module.exports = router;

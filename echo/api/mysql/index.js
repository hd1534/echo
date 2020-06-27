var express = require("express");
var router = express.Router();
const { Tags } = require("../../models/sql");

router.get("/", (req, res, next) => {
  Tags.findAll({ attributes: ["idx", "name"] })
    .then((result) => {
      if (!result) {
        res.status(404).send("NotFound");
      } else res.send(result);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;

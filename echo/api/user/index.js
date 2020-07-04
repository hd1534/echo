var express = require("express");
var router = express.Router();
const ctrl = require("./user.ctrl");

// router.get("/", ctrl.findAll);
router.post("/", ctrl.create);
router.get("/", ctrl.findByIdx);
router.put("/", ctrl.updateByIdx);
router.delete("/", ctrl.findByIdxAndDelete);

module.exports = router;

var express = require("express");
var router = express.Router();
const ctrl = require("./user.ctrl");

// router.get("/", ctrl.findAll);
router.post("/", ctrl.create);
router.get("/idx/:idx", ctrl.findByIdx);
router.put("/idx/:idx", ctrl.updateByIdx);
router.delete("/idx/:idx", ctrl.findByIdxAndDelete);

module.exports = router;

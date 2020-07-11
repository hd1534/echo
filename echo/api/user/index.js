var express = require("express");
var router = express.Router();
const ctrl = require("./user.ctrl");
const { tokenCheck } = require("../token/token.ctrl");

// router.get("/", ctrl.findAll);
router.post("/", ctrl.create);
router.get("/idx/:idx", tokenCheck, ctrl.findByIdx);
router.put("/idx/:idx", tokenCheck, ctrl.updateByIdx);
router.delete("/idx/:idx", tokenCheck, ctrl.findByIdxAndDelete);

module.exports = router;

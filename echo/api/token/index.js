var express = require("express");
var router = express.Router();
const ctrl = require("./token.ctrl");

// router.get("/", ctrl.findAll);
router.post("/", ctrl.getToken);
router.delete("/", ctrl.revokeToken);
router.get("/check", ctrl.tokenCheck);

module.exports = router;

var express = require("express");
var router = express.Router();
const ctrl = require("./token.ctrl");

// router.get("/", ctrl.findAll);
router.post("/token", ctrl.getToken);
router.get("/tokenCheck", ctrl.tokenCheck);
router.delete("/token", ctrl.revokeToken);

module.exports = router;

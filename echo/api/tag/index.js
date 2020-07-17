var express = require("express");
var router = express.Router();
const ctrl = require("./tag.ctrl");

// router.get("/", ctrl.findAll);
router.post("/", ctrl.create);
router.get("/idx/:idx", ctrl.findByIdx);
router.put("/idx/:idx", ctrl.updateByIdx);
router.delete("/idx/:idx", ctrl.findByIdxAndDelete);
router.get("/mine", ctrl.findAllByOwnerIdx);

module.exports = router;

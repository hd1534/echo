const express = require("express");
const { tokenCheck } = require("./token/token.ctrl");
const { permissionChecker } = require("./permission/permission.ctrl");
const router = express.Router();

router.use("/token", require("./token"));
router.use("/permission", tokenCheck, require("./permission"));
router.use("/test", tokenCheck, require("./test")); // have to deleted
router.use("/user", tokenCheck, require("./user"));
router.use("/comment", tokenCheck, require("./comment"));
router.use("/admin", tokenCheck, permissionChecker("admin", 10), (req, res) => {
  res.send("hi admin!");
});

router.use((req, res) => {
  res.send("this is echo back"); // tmp
});

module.exports = router;

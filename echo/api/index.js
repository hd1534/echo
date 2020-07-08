const express = require("express");
const router = express.Router();

tokenCheck = require("./token/token.ctrl").tokenCheck;

router.use("/token", require("./token"));
router.use("/permission", tokenCheck, require("./permission"));
router.use("/test", tokenCheck, require("./test"));
router.use("/mysql", tokenCheck, require("./mysql"));
router.use("/user", tokenCheck, require("./user"));
router.use("/comment", tokenCheck, require("./comment"));

router.use((req, res) => {
  res.send("this is echo back"); // tmp
});

module.exports = router;

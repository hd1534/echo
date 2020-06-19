const express = require("express");
const router = express.Router();

router.use("/test", require("./test"));
router.use("/mysql", require("./mysql"))

router.use((req, res) => {
    res.send("this is echo back");  // tmp
})

module.exports = router;
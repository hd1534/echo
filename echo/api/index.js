const express = require("express");
const router = express.Router();

router.use("/test", require("./test"));

router.use((req, res) => {
    res.send("this is echo back");  // tmp
})

module.exports = router;
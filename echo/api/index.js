const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger")();
const router = express.Router();

const { tokenCheck } = require("./token/token.ctrl");
const { permissionChecker } = require("./permission/permission.ctrl");

router.use("/token", require("./token"));
router.use("/permission", tokenCheck, require("./permission"));
router.use("/test", tokenCheck, require("./test")); // have to deleted
router.use("/user", tokenCheck, require("./user"));
router.use("/comment", tokenCheck, require("./comment"));
router.use("/admin", tokenCheck, permissionChecker("admin", 10), (req, res) => {
  res.send("hi admin!");
});

// swagger
router.use(
  "/api-docs",
  function (req, res, next) {
    swaggerDocument.host = req.get("host");
    req.swaggerDoc = swaggerDocument;
    next();
  },
  swaggerUi.serve,
  swaggerUi.setup()
);
router.get("/api-docs.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

router.use((req, res) => {
  res.send("this is echo back"); // tmp
});

module.exports = router;

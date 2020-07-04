var express = require("express");
var router = express.Router();
const ctrl = require("./user.ctrl");

// router.get("/", ctrl.findAll);
router.post("/signup", ctrl.signUp);
router.post("/login", ctrl.LogIn);
// router.get("/idx/:idx", ctrl.idxChecker, ctrl.findByIdx); // 상세 조회
// router.put("/idx/:idx", ctrl.idxChecker, ctrl.updateByIdx); // 수정
// router.delete("/idx/:idx", ctrl.idxChecker, ctrl.findByIdxAndDelete); // 삭제

module.exports = router;

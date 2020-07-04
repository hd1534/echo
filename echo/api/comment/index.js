var express = require("express");
var router = express.Router();
const ctrl = require("./comment.ctrl");

router.get("/", ctrl.findAll);
router.post("/", ctrl.create);
router.get("/idx/:idx", ctrl.idxChecker, ctrl.findByIdx); // 상세 조회
router.put("/idx/:idx", ctrl.idxChecker, ctrl.updateByIdx); // 수정
router.delete("/idx/:idx", ctrl.idxChecker, ctrl.findByIdxAndDelete); // 삭제

module.exports = router;

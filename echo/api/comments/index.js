var express = require("express");
var router = express.Router();
const ctrl = require("./comments.ctrl");

router.get("/", ctrl.findAll);
router.get("/idx/:idx", ctrl.findByIdx); // 상세 조회
// router.post("/", ctrl.create); // 등록
// router.put("/:id", ctrl.checkId, ctrl.update); // 수정
// router.delete("/:id", ctrl.checkId, ctrl.remove); // 삭제

module.exports = router;

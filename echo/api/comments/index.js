var express = require("express");
var router = express.Router();
const ctrl = require("./comments.ctrl");

router.get("/", ctrl.list); // 목록 조회
router.get("/:id", ctrl.checkId, ctrl.detail); // 상세 조회
router.post("/", ctrl.create); // 등록
router.put("/:id", ctrl.checkId, ctrl.update); // 수정
router.delete("/:id", ctrl.checkId, ctrl.remove); // 삭제

module.exports = router;

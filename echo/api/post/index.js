var express = require("express");
var router = express.Router();
const ctrl = require("./post.ctrl");

router.get("/", ctrl.list); // 목록 조회
router.get("/_id/:_id", ctrl.detail); // 상세 조회
router.post("/", ctrl.create); // 등록
router.put("/_id/:_id", ctrl.update); // 수정
router.delete("/_id/:_id", ctrl.remove); // 삭제

module.exports = router;

var express = require("express");
var router = express.Router();
const ctrl = require("./post.ctrl");

router.get("/", ctrl.listAll); // 목록 조회
router.get("/_id/:_id", ctrl.findById);
router.get("/title/:title", ctrl.findAllByTitle);
router.get("/content/:content", ctrl.findAllByContent);
router.get("/writer/idx/:idx", ctrl.findAllByWriterIdx);

router.post("/", ctrl.create); // 등록

router.put("/_id/:_id", ctrl.findByIdAndUpdate); // 수정
router.delete("/_id/:_id", ctrl.findByIdAndDelete); // 삭제

module.exports = router;

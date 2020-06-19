const mongoose = require("mongoose");

// 스키마 정의
const TestSchema = new mongoose.Schema({
  test: {
    type: String,
    trim: true, // 앞뒤 공백 자동 제거
    required: true, // 필수 항목인가?
  },
  data: {
    type: String,
    trim: true, // 앞뒤 공백 자동 제거
    required: true, // 필수 항목인가?
  },
  created: {
    type: Date,
    default: Date.now, // 기본값
  },
});

// 모델 생성
// model(모델명, 스키마) -> 모델명s 컬렉션을 없으면 자동으로 만들어 작업함
// model(모델명, 스키마, 컬렉션명) -> 명시된 컬렉션명으로 작업함.
const Test = mongoose.model("test", TestSchema); // tests 스키마가 만들어짐

module.exports = Test;

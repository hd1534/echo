const mongoose = require("mongoose");

const Writer = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  idx: {
    type: Number,
    required: true,
  },
});
const Comments = new mongoose.Schema();
Comments.add({
  title: String,
  comment: String,
  writer: Writer,
  subComments: [Comments],
});

// 스키마 정의
const PostSchema = new mongoose.Schema({
  writer: Writer,
  date: {
    type: Date,
    default: Date.now,
  },
  title: {
    type: String,
    required: true,
  },
  post: {
    type: String,
    required: true, // 필수 항목인가?
  },
  comments: [Comments],
  meta: {
    likes: {
      type: Number,
      default: 0,
    },
  },
  liked_people: [{ idx: Number }],
});

// 모델 생성
// model(모델명, 스키마) -> 모델명s 컬렉션을 없으면 자동으로 만들어 작업함
// model(모델명, 스키마, 컬렉션명) -> 명시된 컬렉션명으로 작업함.
const Post = mongoose.model("post", PostSchema); // posts 스키마가 만들어짐

module.exports = Post;

const xss = require("xss");
const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema();
CommentSchema.add({
  content: {
    type: String,
    required: true,
    set: xss,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  writer: {
    type: Number,
    // type: mongoose.Schema.ObjectId,
    required: [true, "writer is empty"],
    // ref: "user",
  }, // TODO: https://mongoosejs.com/docs/2.7.x/docs/populate.html 참고해서 수정할것
  subComments: [CommentSchema],
});

const PostSchema = new mongoose.Schema({
  // tags: {type:[{name: String, idx: Number}],required:true},  // will be added
  writer: {
    type: Number,
    // type: mongoose.Schema.ObjectId,
    required: [true, "writer is empty"],
    // ref: "user",
  }, // TODO: https://mongoosejs.com/docs/2.7.x/docs/populate.html 참고해서 수정할것
  title: {
    type: String,
    required: [true, "title is empty"],
    set: xss,
  },
  content: {
    type: String,
    required: [true, "content is empty"],
    set: xss,
  },
  status: {
    type: String,
    enum: ["normal", "censored"],
    default: "normal",
  },
  date: {
    type: Date,
    default: Date.now,
  },
  comments: [CommentSchema],
  meta: {
    likes: {
      type: Number,
      default: 0,
    },
  },
  liked_people_idxs: {
    type: [Number],
    set: function (v, schematype) {
      if (
        this instanceof mongoose.Document &&
        this.liked_people_idxs &&
        v != null
      ) {
        // 이렇게 했더니 삭제일때도 실행된다! 이거 수정해야된다
        this.meta.likes = this.liked_people_idxs.length + v.length;
      }
      return v;
    },
  },
});
PostSchema.virtual("likes").get(function () {
  return this.liked_people_idxs.length;
});

const Post = mongoose.model("post", PostSchema);

module.exports = Post;

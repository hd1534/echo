const xss = require("xss");
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  idx: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
    set: xss,
  },
  id: {
    type: String,
    unique: true,
    required: true,
    set: xss,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    set: xss,
  },
  type: {
    type: String,
    enum: ["T", "D", "S", "P", "O"],
    default: "O",
  },
  gender: {
    type: String,
    enum: ["M", "F", "O"],
    default: "O",
  },

  // 자기소개? 같은거 만들어야지
  info: {
    type: {
      content: {
        set: xss,
        type: String,
      },
    },
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("user", UserSchema);

module.exports = User;

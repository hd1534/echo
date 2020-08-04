const xss = require("xss");
const mongoose = require("mongoose");

const TagSchema = new mongoose.Schema({
  idx: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
    set: xss,
  },
  owner_idx: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
    set: xss,
  },
  join_option: {
    type: String,
    enum: ["request", "private", "free_for_all"],
    default: "request",
  },
  user: {
    type: [
      {
        // TODO 수정해야됨 임시방편
        user_idx: Number,
        admin: { type: Boolean, default: false },
        modification_allowed: { type: Boolean, default: false },
        invitation_allowed: { type: Boolean, default: false },
        post_allowed: { type: Boolean, default: false },
        acceptance_allowed: { type: Boolean, default: false },
      },
    ],
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
});

const Tag = mongoose.model("tag", TagSchema);

module.exports = Tag;

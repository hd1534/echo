const _ = require("lodash");

const { Posts } = require("../../models/sql");
const postModel = require("../../models/mongo/post");
const mongoose = require("mongoose");

const listAll = (req, res, next) => {
  const limit = parseInt(req.query.limit || 10, 10);
  const offset = parseInt(req.query.offset || 0, 10);

  if (Number.isNaN(limit)) return res.status(400).send("limit must be number");
  if (Number.isNaN(offset))
    return res.status(400).send("offset must be number");

  postModel
    .find((err, result) => {
      if (err) next(err); // 직접 처리해도 됨

      res.json(result);
    })
    .skip(offset)
    .limit(limit)
    .sort({ date: -1 });
};

const findById = (req, res, next) => {
  const _id = req.params._id;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(400).send("_id is invalid");

  result = postModel.findById(_id, (err, result) => {
    if (err) next(err);

    if (!result) return res.status(404).send("NotFound");

    res.json(result);
  });
};

// 정규식으로 찾음
const findAllByTitle = (req, res, next) => {
  const title = req.params.title;

  result = postModel.find({ title: RegExp(title) }, (err, result) => {
    if (err) next(err);

    res.json(result);
  });
};

const findAllByContent = (req, res, next) => {
  const content = req.params.content;

  result = postModel.find({ content: RegExp(content) }, (err, result) => {
    if (err) next(err);

    res.json(result);
  });
};

// TODO: 나중에 wirter  ref 로 바꾸면 수정해야됨
const findAllByWriterIdx = (req, res, next) => {
  const writerIdx = req.params.idx;

  result = postModel.find({ writer: writerIdx }, (err, result) => {
    if (err) next(err);

    res.json(result);
  });
};

const create = (req, res, next) => {
  const { title, content, comments, liked_people_idxs } = req.body;
  // TODO: wirter를 ref 로 바꾸면 바꿔야됨 (임시로 이렇게 해둠)
  // writer = {
  //   idx: req.decodedJWT.user.idx,
  //   name: req.decodedJWT.user.name,
  // };
  writer = req.decodedJWT.user.idx;

  // Document.save() 방식
  const post = new postModel({
    writer,
    title,
    content,
    comments,
    liked_people_idxs,
  });

  post.save((mongoErr, result) => {
    if (mongoErr) return next(mongoErr);

    Posts.create({
      writer_idx: writer,
      title,
      post_id: result._id.toString(),
    })
      .then((data) => res.status(201).json(result))
      .catch((sqlErr) => {
        postModel.findByIdAndDelete(result._id, (InnerMongoErr, result) => {
          if (InnerMongoErr) {
            console.error("zombie post created in mongo. _id : " + result._id);
            return res
              .status(500)
              .send("critical server error\n please contect manager ");
          }
        });

        return next(sqlErr);
      });
  });

  // PostModel.create() 방식
  // postModel.create({ post, data }, (err, result) => {
  //   if (err) return next(err);
  //   res.status(201).json(result);
  // });
};

const findByIdAndUpdate = (req, res, next) => {
  const _id = req.params._id;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(400).send("_id is invalid");

  const { content, title } = req.body;
  if (!content && !title) return res.status(400).send("nothing to change");

  post = postModel.findById(_id, (err, post) => {
    if (err) next(err);
    if (!result) return res.status(404).send("NotFound");

    if (content) post.content = content;
    if (title) post.content = title;

    post
      .save()
      .then((post) => res.status(202).send(post))
      .catch((err) => next(err));
  });

  // postModel.findByIdAndUpdate(
  //   _id,
  //   { content, title },
  //   { new: true },
  //   (err, result) => {
  //     if (err) next(err);
  //     if (!result) return res.status(404).send();

  //     res.json(result);
  //   }
  // );
};

const findByIdAndDelete = (req, res, next) => {
  const _id = req.params._id;

  postModel.findByIdAndDelete(_id, (err, result) => {
    if (err) next(err);
    if (!result) return res.status(404).send();

    res.send(result);
  });
};

// 이 밑에 있는것들은 sql유저테이블과 연결 x  나중에 해야됨

const likePostById = (req, res, next) => {
  const _id = req.params._id;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(400).send("_id is invalid");

  post = postModel.findById(_id, (err, post) => {
    if (err) next(err);
    if (!post) return res.status(404).send("post NotFound");

    if (!post.liked_people_idxs.includes(req.decodedJWT.user.idx)) {
      post.liked_people_idxs.push(req.decodedJWT.user.idx);
      post
        .save()
        .then((post) => res.status(201).send("liked"))
        .catch((err) => next(err));
    }
    return res.status(200).send("already liked");
  });
};

const unlikePostById = (req, res, next) => {
  const _id = req.params._id;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(400).send("_id is invalid");

  post = postModel.findById(_id, (err, post) => {
    if (err) next(err);
    if (!post) return res.status(404).send("post NotFound");

    post.liked_people_idxs = _.without(
      post.liked_people_idxs,
      req.decodedJWT.user.idx
    );
    post
      .save()
      .then((post) => res.status(202).send("unliked"))
      .catch((err) => next(err));
  });
};

// subComment 구현안함 !
const addComment = (req, res, next) => {
  const _id = req.params._id;

  const { content } = req.body;
  if (!content) return res.status(400).send("content is empty");

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(400).send("_id is invalid");

  post = postModel.findById(_id, (err, post) => {
    if (err) next(err);
    if (!post) return res.status(404).send("post NotFound");

    post.comments.push({
      content,
      writer: {
        idx: req.decodedJWT.user.idx,
        name: req.decodedJWT.user.name,
      },
    });

    post
      .save()
      .then((post) => res.status(202).send())
      .catch((err) => next(err));
  });
};

module.exports = {
  listAll,
  findById,
  findAllByTitle,
  findAllByContent,
  findAllByWriterIdx,
  create,
  findByIdAndUpdate,
  findByIdAndDelete,
  likePostById,
  unlikePostById,
  addComment,
};

const { Posts } = require("../../models/sql");
const postModel = require("../../models/mongo/post");
const mongoose = require("mongoose");

const list = (req, res, next) => {
  const limit = parseInt(req.query.limit || 10, 10);

  if (Number.isNaN(limit)) return res.status(400).send("limit must be number");

  postModel
    .find((err, result) => {
      if (err) next(err); // 직접 처리해도 됨

      // res.json(result);
      res.json(result);
    })
    .limit(limit);
};

const detail = (req, res, next) => {
  const _id = req.params._id;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(400).send("_id is invalid");

  result = postModel.findById(_id, (err, result) => {
    if (err) next(err);

    if (!result) return res.status(404).send("NotFound");

    res.json(result);
  });
};

const create = (req, res, next) => {
  const { title, content, comments, liked_people_idxs } = req.body;
  writer = {
    idx: req.decodedJWT.user.idx,
    name: req.decodedJWT.user.name,
  };

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
      writer_idx: writer.idx,
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

const update = (req, res, next) => {
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

const remove = (req, res, next) => {
  const _id = req.params._id;

  postModel.findByIdAndDelete(_id, (err, result) => {
    if (err) next(err);
    if (!result) return res.status(404).send();

    res.send(result);
  });
};

module.exports = { list, detail, create, update, remove };

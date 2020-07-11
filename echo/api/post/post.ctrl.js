const postModel = require("../../models/mongo/post");
const mongoose = require("mongoose");

// mongoose.Types.ObjectId.isValid(_id)

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

  result = postModel.findById(_id, (err, result) => {
    if (err) next(err);

    if (!result) return res.status(404).end();

    res.json(result);
  });
};

const create = (req, res, next) => {
  const { post, data } = req.body;
  console.log(data);
  if (!post || !data) return res.status(400).end();

  // Document.save()
  // const post = new postModel({post, data});
  // post.save((err, result) => {
  //     if (err)
  //         next(err);
  //     res.status(201).json(result);
  // })

  // PostModel.create()
  postModel.create({ post, data }, (err, result) => {
    if (err) next(err);
    res.status(201).json(result);
  });
};

const update = (req, res, next) => {
  const _id = req.params._id;

  const { post, data } = req.body;

  //                           _id, data           , option     , callback function
  postModel.findByIdAndUpdate(
    _id,
    { post, data },
    { new: true },
    (err, result) => {
      if (err) next(err);
      if (!result) return res.status(404).end();

      res.json(result);
    }
  );
};

const remove = (req, res, next) => {
  const _id = req.params._id;

  postModel.findByIdAndDelete(_id, (err, result) => {
    if (err) next(err);
    if (!result) return res.status(404).end();

    res.send(result);
  });
};

module.exports = { list, detail, create, update, remove };

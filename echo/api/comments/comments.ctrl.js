const { Comments } = require("../../models/sql");

const findAll = (req, res, next) => {
  const offset = parseInt(req.query.offset || 0, 10);
  const limit = parseInt(req.query.limit || 10, 10);
  if (Number.isNaN(limit) || Number.isNaN(offset)) return res.status(400).end(); // 에러는 마음대로 (400 = bad request)

  Comments.findAll({
    attributes: ["idx", "content"],
    offset: offset,
    limit: limit,
  })
    .then((result) => {
      if (!result) {
        res.status(404).send("NotFound");
      } else {
        console.log(result);
        res.send(result);
      }
    })
    .catch((err) => {
      next(err);
    });
};

const findByIdx = (req, res, next) => {
  const idx = req.params.idx;

  Comments.findOne({
    attributes: ["idx", "content"],
    where: {
      idx: idx,
    },
  })
    .then((result) => {
      if (!result) {
        res.status(404).send("NotFound");
      } else {
        console.log(result);
        res.send(result);
      }
    })
    .catch((err) => {
      next(err);
    });
};
// 등록
const create = (req, res, next) => {
  const { test, data } = req.body;
  console.log(data);
  if (!test || !data) return res.status(400).end();

  // Document.save()
  // const test = new testModel({test, data});
  // test.save((err, result) => {
  //     if (err)
  //         next(err);
  //     res.status(201).json(result);
  // })

  // TestModel.create()
  testModel.create({ test, data }, (err, result) => {
    if (err) next(err);
    res.status(201).json(result);
  });
};

// 수정  api/test/:id
const update = (req, res, next) => {
  const id = req.params.id;

  const { test, data } = req.body;

  //                           id, data           , option     , callback function
  testModel.findByIdxAndUpdate(
    id,
    { test, data },
    { new: true },
    (err, result) => {
      if (err) next(err);
      if (!result) return res.status(404).end();

      res.json(result);
    }
  );
};
// 삭제  api/test/:id
const remove = (req, res, next) => {
  const id = req.params.id;

  testModel.findByIdxAndDelete(id, (err, result) => {
    if (err) next(err);
    if (!result) return res.status(404).end();

    res.send(result);
  });
};

module.exports = { findAll, findByIdx };

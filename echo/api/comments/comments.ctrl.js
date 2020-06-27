const { Comments } = require("../../models/sql");

const findAll = (req, res, next) => {
  Comments.findAll({
    attributes: ["idx", "content"],
  })
    .then((result) => {
      if (!result) {
        res.status(404).send("NotFound");
      } else res.send(result);
    })
    .catch((err) => {
      next(err);
    });
};

// 목록조회
const list = (req, res, next) => {
  const limit = parseInt(req.query.limit || 10, 10);

  if (Number.isNaN(limit)) return res.status(400).end(); // 에러는 마음대로 (400 = bad request)

  testModel
    .find((err, result) => {
      if (err) next(err); // 직접 처리해도 됨

      // res.json(result);
      res.json(result);
    })
    .limit(limit);
};
// 상세조회   api/test/:id
const detail = (req, res, next) => {
  const id = req.params.id;

  result = testModel.findById(id, (err, result) => {
    if (err) next(err);

    if (!result) return res.status(404).end();

    res.json(result);
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
  testModel.findByIdAndUpdate(
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

  testModel.findByIdAndDelete(id, (err, result) => {
    if (err) next(err);
    if (!result) return res.status(404).end();

    res.send(result);
  });
};

module.exports = { findAll };

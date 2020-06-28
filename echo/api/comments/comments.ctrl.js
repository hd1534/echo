const { Comments } = require("../../models/sql");

const idxChecker = (req, res, next) => {
  const idx = req.params.idx;
  if (isNaN(idx)) return res.status(400).send("check your idx");
  next();
};

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
  console.log(req.body);
  Comments.create(req.body, { returning: true })
    .then((result) => {
      if (!result) {
        res.status(404).send("NotFound");
      } else {
        console.log(result);
        res.send(result);
      }
    })
    .catch((err) => {
      // instanceof 사용하도록 바꾸기
      if (err.name == "SequelizeValidationError")
        res.status(400).send(err.errors.map((err) => err.message));
      if (err.name == "SequelizeDatabaseError")
        res.status(400).send(err.parent.sqlMessage);
      next(err);
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

const findByIdxAndDelete = (req, res, next) => {
  const idx = req.params.idx;

  Comments.destroy({
    where: {
      idx: idx,
    },
  })
    .then((result) => {
      if (!result) {
        res.status(404).send("NotFound");
      } else {
        res.send(result);
      }
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = { idxChecker, create, findAll, findByIdx, findByIdxAndDelete };

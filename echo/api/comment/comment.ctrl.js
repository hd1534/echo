const { Comments } = require("../../models/sql");

const idxChecker = (req, res, next) => {
  const idx = req.params.idx;
  if (isNaN(idx)) return res.status(400).send("check your idx");
  next();
};

const findAll = (req, res, next) => {
  const offset = parseInt(req.query.offset || 0, 10);
  const limit = parseInt(req.query.limit || 10, 10);
  if (Number.isNaN(limit) || Number.isNaN(offset)) return res.status(400).end();

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
    .catch((err) => next(err));
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
        res.send(result);
      }
    })
    .catch((err) => next(err));
};

const create = (req, res, next) => {
  Comments.create(req.body, { returning: true })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => next(err));
};

const updateByIdx = (req, res, next) => {
  const idx = req.params.idx;
  Comments.update(req.body, {
    where: { idx: idx },
    fields: ["content"], // fields to update
  })
    .then((result) => {
      if (!result) {
        res.status(404).send("NotFound");
      } else {
        res.send(result);
      }
    })
    .catch((err) => next(err));
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
        res.status(200).send("deleted");
      }
    })
    .catch((err) => next(err));
};

module.exports = {
  idxChecker,
  create,
  updateByIdx,
  findAll,
  findByIdx,
  findByIdxAndDelete,
};

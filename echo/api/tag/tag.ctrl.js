const { Tags } = require("../../models/sql");

const create = (req, res, next) => {
  var { name, description, join_option } = req.body;

  if (!name) return res.status(400).send("enter tag name");
  if (!description) return res.status(400).send("enter your description");
  join_option = join_option ? join_option : "request";
  owner_idx = req.decodedJWT.user.idx;

  Tags.create({ owner_idx, name, description, join_option })
    .then((user) => res.send(user))
    .catch((err) => next(err));
};

const findByIdx = (req, res, next) => {
  const idx = req.params.idx;

  Tags.findOne({ where: { idx: idx } })
    .then((result) => {
      if (!result) return res.status(404).send("NotFound");

      return res.send(result);
    })
    .catch((err) => next(err));
};

const findAllByOwnerIdx = (req, res, next) => {
  Tags.findAll({
    // attributes: ["name", "description"],
    where: {
      owner_idx: req.decodedJWT.user.idx,
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

const updateByIdx = (req, res, next) => {
  const idx = req.params.idx;

  Users.update(req.body, {
    where: { idx: idx },
    fields: ["name", "description"], // fields to update
  })
    .then((result) => {
      if (!result) return res.status(404).send("NotFound");

      return res.send(result);
    })
    .catch((err) => next(err));
};

const findByIdxAndDelete = (req, res, next) => {
  const idx = req.params.idx;

  Tags.destroy({
    where: {
      idx: idx,
    },
  })
    .then((result) => {
      if (!result) return res.status(404).send("NotFound");

      return res.status(200).send("deleted");
    })
    .catch((err) => next(err));
};

module.exports = {
  create,
  updateByIdx,
  findByIdx,
  findAllByOwnerIdx,
  findByIdxAndDelete,
};

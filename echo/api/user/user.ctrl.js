const { Users } = require("../../models/sql");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;

const idxChecker = (req, res, next) => {
  const idx = req.params.idx;
  if (isNaN(idx)) return res.status(400).send("check your idx");
  next();
};

const emailChecker = (email) => {
  const re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  return re.test(email);
};
const passwordChecker = (password) => {
  // 적어도 1개 이상의 숫자, 특수문자, 영문자로 구성되어 7 ~ 15글자
  const re = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
  return re.test(password);
};

const signUp = (req, res, next) => {
  var { name, id, password, email, gender, user_type } = req.body;
  // start checking data
  if (!name) return res.status(400).send("enter your name");
  if (!id) return res.status(400).send("enter your id");
  if (!password) return res.status(400).send("enter your password");
  if (!passwordChecker(password))
    return res.status(400).send("check your password");
  if (password == name)
    return res.status(400).send("your password is same as your name");
  if (password == id)
    return res.status(400).send("your password is same as your id");
  if (password == email)
    return res.status(400).send("your password is same as your email");
  if (!email) return res.status(400).send("enter your email");
  if (!emailChecker(email)) return res.status(400).send("check your email");
  user_type = user_type ? user_type : "O";
  gender = gender ? gender : "O";
  // end checking

  Users.findOne({ where: { email: email } })
    .then((user) => {
      if (user) return res.status(409).send("this email already used");

      bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) return res.status(500).send("server error");

        Users.create({ name, id, password: hash, email, gender, user_type })
          .then((user) => res.send(user))
          .catch((err) => next(err));
      });
    })
    .catch((err) => next(err));
};

const LogIn = (req, res) => {
  const { id, password } = req.body;

  if (!id) return res.status(400).send("enter your id");
  if (!password) return res.status(400).send("enter your password");
  if (!passwordChecker(password, id))
    return res.status(400).send("check your password");

  Users.findOne({ where: { id: id } })
    .then((user) => {
      if (!user) return res.status(404).send("user not found");

      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) return res.status(500).send("server error");
        if (!isMatch) return res.status(403).send("password is incorrect");

        user.password = null;
        const token = jwt.sign({ user }, "secretKey");
        // res.cookie("token", token, { httpOnly: true });
        // res.json(result);
        return res.send(token);
      });
    })
    .catch((err) => next(err));
};

const checkAuth = (req, res, next) => {
  // 모든 화면에서 공통으로 사용되는 값
  res.locals.user = null;

  const token = req.cookies.token;

  if (!token) {
    if (
      req.url === "/" ||
      req.url === "/api/user/signup" ||
      req.url === "/api/user/login"
    )
      return next();
    else return res.redirect("/api/user/login");
  }

  jwt.verify(token, "secretKey", (err, _id) => {
    if (err) {
      res.clearCookie("token");
      return res.render("user/login");
    }
    userModel.findOne({ _id, token }, (err, user) => {
      if (err) return res.status(500).send("인증 시 오류가 발생했습니다.");
      if (!user) return res.render("user/login");
      res.locals.user = { name: user.name, role: user.role };
      return next();
    });
  });
};

const logOut = (req, res) => {
  const token = req.cookies.token;

  jwt.verify(token, "secretKey", (err, _id) => {
    if (err) return res.status(500).send("로그아웃 시 오류가 발생했습니다.");
    userModel.findByIdAndUpdate(_id, { token: "" }, (err, result) => {
      if (err) return res.status(500).send("로그아웃 시 오류가 발생했습니다.");
      res.clearCookie("token");
      res.redirect("/");
    });
  });
};

///////////////////////////////////////////////////////////////////////////////////

const findAll = (req, res, next) => {
  const offset = parseInt(req.query.offset || 0, 10);
  const limit = parseInt(req.query.limit || 10, 10);
  if (Number.isNaN(limit) || Number.isNaN(offset)) return res.status(400).end(); // 에러는 마음대로 (400 = bad request)

  Users.findAll({
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

  Users.findOne({
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

const updateByIdx = (req, res, next) => {
  const idx = req.params.idx;
  Users.update(req.body, {
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

  Users.destroy({
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
  signUp,
  LogIn,
  updateByIdx,
  findAll,
  findByIdx,
  findByIdxAndDelete,
};

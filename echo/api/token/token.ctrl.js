const { Users, RevokedTokens } = require("../../models/sql");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const privateKey = fs.readFileSync(path.resolve(__dirname, "../../rs256.pem"));
const publicKey = fs.readFileSync(path.resolve(__dirname, "../../rs256.pub"));

const passwordChecker = require("../../functions").passwordChecker;

const getToken = (req, res) => {
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

        delete user.dataValues["password"];
        console.log(Object.keys(user.dataValues));
        const token = jwt.sign(
          // 만료 시간 : 30분
          { user, exp: Math.floor(Date.now() / 1000) + 60 * 30 },
          privateKey,
          { algorithm: "RS256" }
        );
        // res.cookie("token", token, { httpOnly: true });
        // res.json(result);
        return res.send(token);
      });
    })
    .catch((err) => next(err));
};

const tokenCheck = (req, res, next) => {
  console.log("tokenCheck");
  const token = req.token;

  if (!token) return res.status(403).send("Missing Authorization Header");

  // algorithm 체크
  jwt.verify(token, publicKey, { algorithms: ["RS256"] }, (err, decoded) => {
    if (err) return next(err);

    RevokedTokens.findOne({ where: { jwt: token } })
      .then((result) => {
        if (result) return res.status(403).send("revoked token");
        return next();
      })
      .catch((err) => next(err));
  });
};

const revokeToken = (req, res, next) => {
  const token = req.token;

  if (!token) return res.status(403).send("Missing Authorization Header");

  jwt.verify(token, publicKey, { algorithms: ["RS256"] }, (err, decoded) => {
    if (err) return next(err);

    RevokedTokens.create({ jwt: token })
      .then((RevokedToken) => res.send(RevokedToken))
      .catch((err) => next(err));
  });
};

module.exports = {
  getToken,
  tokenCheck,
  revokeToken,
};

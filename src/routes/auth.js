const express = require("express");
const router = express.Router();
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("shop.db");

const register = function (req, res) {
  // console.log(req.body);
  // process.exit();
  const userData = [
    req.body.name,
    req.body.email,
    req.body.password,
    req.body.phone,
    req.body.role,
    req.body.address
  ]
  db.serialize(() => {
    db.run(
      `insert into users (name , email , password , phone , role , address)
      values (? , ? , ? , ? , ? , ?)`,
      userData ,
      (err) => {
        if (err) {
          res.send(err.message);
        } else {
          res.send("user added successfully");
        }
      },
    );
  });
  // res.send('register page')
};

const me = function (req, res) {
  db.serialize(() => {
    db.all(`select * from users`, [], (err, rows) => {
      if (err) {
        res.send(err.message);
      } else {
        res.json(rows);
      }
    });
  });
  // res.send('me page')
};

const login = function (req, res) {
  res.send("login page");
};

const logout = function (req, res) {
  res.send("logout page");
};

const resetPassword = function (req, res) {
  res.send("reset password page");
};

router.post("/register", register);

router.get("/me", me);

router.get("/login", login);

router.get("/logout", logout);

router.get("/reset-password", resetPassword);


module.exports = router;

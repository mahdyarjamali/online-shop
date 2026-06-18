const express = require("express");
const router = express.Router();
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("shop.db");

const register = function (req, res) {
  db.serialize(() => {
    db.run(
      `insert into users (name , email , password , role)
      values (? , ? , ? , ? )`,
      ["mahdyar jamali", "dmkkclmkdck@gmail.com", 65123, "user"],
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

router.get("/register", register);

router.get("/me", me);

router.get("/login", login);

router.get("/logout", logout);

router.get("/reset-password", resetPassword);

router.use("/auth", router);

module.exports = router;

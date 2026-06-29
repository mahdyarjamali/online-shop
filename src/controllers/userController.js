const db = require("../db");

const getAllUsers = function (req, res) {
  db.serialize(() => {
    db.all(`select * from users`, [], (err, rows) => {
      if (err) {
        res.send(err.message);
      } else {
        res.json(rows);
      }
    });
  });
};

const getUserById = function (req, res) {
  db.serialize(() => {
    db.get(
      `select * from users
            where id = ?`,
      [req.params.id],
      (err, row) => {
        if (err) {
          res.send(err.message);
        } else if (!row) {
          res.send("user not found");
        } else {
          res.json(row);
        }
      },
    );
  });
};

module.exports = {
  getAllUsers,
  getUserById,
};

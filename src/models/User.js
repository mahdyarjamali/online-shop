const db = require("../db");

const User = {
  create: function (userData, callback) {
    db.run(
      `insert into users (name , email , password , phone , role , address)
      values (? , ? , ? , ? , ? , ?)`,
      userData,
      callback,
    );
  },
  findAll: function (callback) {
    db.all(`select * from users`, [], callback);
  },
  delete: function (id, callback) {
    db.run(
      `delete from users
      where id = ?`,
      [id],
      callback,
    );
  },
};

module.exports = User;

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

  findById: function (id, callback) {
    db.get(
      `select * from users
      where id = ?`,
      [id],
      callback,
    );
  },

  findByEmail: function (email, callback) {
    db.get(
      `select * from users
    where email = ?`,
      [email],
      callback,
    );
  },

  resetPassword: function (passwordData, callback) {
    db.run(
      `update users
      set password = ?
      where email = ?`,
      passwordData,
      callback,
    );
  },

  updateUser: function (userData, callback) {
    db.run(
      `update users
      set name = ?,
      email = ?,
      password = ?,
      phone = ?,
      role = ?,
      address = ?
      where id = ?`,
      userData,
      callback,
    );
  },

  deleteUser: function (id, callback) {
    db.run(
      `delete from users
      where id = ?`,
      [id],
      callback,
    );
  },
};

module.exports = User;

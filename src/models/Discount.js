const db = require("../db");

const Discount = {
  create: function (discountData, callback) {
    db.run(
      `insert into discounts (code , percentage , expires_at)
            values (? , ? , ?)`,
      discountData,
      callback,
    );
  },

  findAll: function (callback) {
    db.all(`select * from discounts`, [], callback);
  },

  findByCode: function (code, callback) {
    db.get(
      `select * from discounts
        where code = ?`,
      [code],
      callback,
    );
  },
  updateDiscount: function (discountData, callback) {
    db.run(
      `update discounts
      set code = ?,
      percentage = ?,
      expires_at = ?
      where id = ?`,
      discountData,
      callback,
    );
  },

  deleteDiscount: function (id, callback) {
    db.run(
      `delete from discounts
      where id = ?`,
      [id],
      callback,
    );
  },
};

module.exports = Discount;

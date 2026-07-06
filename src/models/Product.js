const db = require("../db");

const Product = {
  create: function (productData, callback) {
    db.run(
      `insert into products (name , description , price , category , stock , image)
            values (? , ? , ? , ? , ? , ?)`,
      productData,
      callback,
    );
  },

  findAll: function (callback) {
    db.all(`select * from products`, [], callback);
  },

  findById: function (id, callback) {
    db.get(
      `select * from products
        where id = ?`,
      [id],
      callback,
    );
  },

  updateProduct: function (productData, callback) {
    db.run(
      `update products
        set name = ? ,
        description = ? ,
        price = ? ,
        category = ? ,
        stock = ? ,
        image = ?
        where id = ?`,
      productData,
      callback,
    );
  },

  deleteProduct: function (id, callback) {
    db.run(
      `delete from products
        where id = ?`,
      [id],
      callback,
    );
  },
};

module.exports = Product;

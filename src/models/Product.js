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
};

module.exports = Product;

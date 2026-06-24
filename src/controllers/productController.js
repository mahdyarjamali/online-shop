const db = require("../db");

const createProduct = function (req, res) {
  const productData = [
    req.body.name,
    req.body.description,
    req.body.price,
    req.body.category,
    req.body.stock,
    req.body.image,
  ];
  db.serialize(() => {
    db.run(
      `insert into products (name , description , price , category , stock , image)
            values (? , ? , ? , ? , ? , ?)`,
      productData,
      (err) => {
        if (err) {
          res.send(err.message);
        } else {
          res.send("product added successfully");
        }
      },
    );
  });
};

module.exports = {
  createProduct,
};

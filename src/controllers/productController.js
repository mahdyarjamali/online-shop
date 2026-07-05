const Product = require("../models/Product");

const createProduct = function (req, res) {
  const productData = [
    req.body.name,
    req.body.description,
    req.body.price,
    req.body.category,
    req.body.stock,
    req.body.image,
  ];

  Product.create(productData, (err) => {
    if (err) {
      res.send(err.message);
    } else {
      res.send("product added successfully");
    }
  });
};

module.exports = {
  createProduct,
};

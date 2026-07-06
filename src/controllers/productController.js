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

const getAllProducts = function (req, res) {
  Product.findAll((err, rows) => {
    if (err) {
      res.send(err.message);
    } else {
      res.json(rows);
    }
  });
};

const getProductById = function (req, res) {
  Product.findById(req.params.id, (err, row) => {
    if (err) {
      res.send(err.message);
    } else if (!row) {
      res.send("product not found");
    } else {
      res.json(row);
    }
  });
};

const updateProduct = function (req, res) {
  const productData = [
    req.body.name,
    req.body.description,
    req.body.price,
    req.body.category,
    req.body.stock,
    req.body.image,
    req.params.id,
  ];

  Product.updateProduct(productData, function (err) {
    if (err) {
      res.send(err.message);
    } else if (this.changes === 0) {
      res.send("product not found");
    } else {
      res.send("product updated successfully");
    }
  });
};

const deleteProduct = function (req, res) {
  Product.deleteProduct(req.params.id, function (err) {
    if (err) {
      res.send(err.message);
    } else if (this.changes === 0) {
      res.send("product not found");
    } else {
      res.send("product deleted successfully");
    }
  });
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};

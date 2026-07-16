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
      return res.status(500).json({
        message: err.message,
      });
    }

    return res.status(201).json({
      message: "Product created successfully",
    });
  });
};

const getAllProducts = function (req, res) {
  Product.findAll((err, rows) => {
    if (err) {
      return res.status(500).json({
        message: err.message,
      });
    }

    return res.status(200).json({
      message: "Products retrieved successfully",
      data: rows,
    });
  });
};

const getProductById = function (req, res) {
  Product.findById(req.params.id, (err, row) => {
    if (err) {
      return res.status(500).json({
        message: err.message,
      });
    }

    if (!row) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    return res.status(200).json({
      message: "Product retrieved successfully",
      data: row,
    });
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
      return res.status(500).json({
        message: err.message,
      });
    }

    if (this.changes === 0) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    return res.status(200).json({
      message: "Product updated successfully",
    });
  });
};

const deleteProduct = function (req, res) {
  Product.deleteProduct(req.params.id, function (err) {
    if (err) {
      return res.status(500).json({
        message: err.message,
      });
    }

    if (this.changes === 0) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    return res.status(200).json({
      message: "Product deleted successfully",
    });
  });
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};

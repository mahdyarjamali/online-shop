const Discount = require("../models/Discount");

const createDiscount = function (req, res) {
  const discountData = [
    req.body.code,
    req.body.percentage,
    req.body.expires_at,
  ];

  Discount.create(discountData, (err) => {
    if (err) {
      return res.status(500).json({
        message: err.message,
      });
    }

    return res.status(201).json({
      message: "Discount created successfully",
    });
  });
};

const getAllDiscounts = function (req, res) {
  Discount.findAll((err, rows) => {
    if (err) {
      return res.status(500).json({
        message: err.message,
      });
    }

    return res.status(200).json({
      message: "Discounts retrieved successfully",
      data: rows,
    });
  });
};

const getDiscountByCode = function (req, res) {
  Discount.findByCode(req.params.code, (err, row) => {
    if (err) {
      return res.status(500).json({
        message: err.message,
      });
    }

    if (!row) {
      return res.status(404).json({
        message: "Discount not found",
      });
    }

    return res.status(200).json({
      message: "Discount retrieved successfully",
      data: row,
    });
  });
};

const updateDiscount = function (req, res) {
  const discountData = [
    req.body.code,
    req.body.percentage,
    req.body.expires_at,
    req.params.id,
  ];

  Discount.updateDiscount(discountData, function (err) {
    if (err) {
      return res.status(500).json({
        message: err.message,
      });
    }

    if (this.changes === 0) {
      return res.status(404).json({
        message: "Discount not found",
      });
    }

    return res.status(200).json({
      message: "Discount updated successfully",
    });
  });
};

const deleteDiscount = function (req, res) {
  Discount.deleteDiscount(req.params.id, function (err) {
    if (err) {
      return res.status(500).json({
        message: err.message,
      });
    }

    if (this.changes === 0) {
      return res.status(404).json({
        message: "Discount not found",
      });
    }

    return res.status(200).json({
      message: "Discount deleted successfully",
    });
  });
};

module.exports = {
  createDiscount,
  getAllDiscounts,
  getDiscountByCode,
  updateDiscount,
  deleteDiscount,
};

const Discount = require("../models/Discount");

const createDiscount = function (req, res) {
  const discountData = [
    req.body.code,
    req.body.percentage,
    req.body.expires_at,
  ];

  Discount.create(discountData, (err) => {
    if (err) {
      res.send(err.message);
    } else {
      res.send("discount created successfully");
    }
  });
};

const getAllDiscounts = function (req, res) {
  Discount.findAll((err, rows) => {
    if (err) {
      res.send(err.message);
    } else {
      res.json(rows);
    }
  });
};

const getDiscountByCode = function (req, res) {
  Discount.findByCode(req.params.code, (err, row) => {
    if (err) {
      res.send(err.message);
    } else if (!row) {
      res.send("discount not found");
    } else {
      res.json(row);
    }
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
      res.send(err.message);
    } else if (this.changes === 0) {
      res.send("discount not found");
    } else {
      res.send("discount updated successfully");
    }
  });
};

const deleteDiscount = function (req, res) {
  Discount.deleteDiscount(req.params.id, function (err) {
    if (err) {
      res.send(err.message);
    } else if (this.changes === 0) {
      res.send("discount not found");
    } else {
      res.send("discount deleted successfully");
    }
  });
};

module.exports = {
  createDiscount,
  getAllDiscounts,
  getDiscountByCode,
  updateDiscount,
  deleteDiscount,
};

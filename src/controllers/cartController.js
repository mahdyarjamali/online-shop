const CartItem = require("../models/CartItem");

const addItem = function (req, res) {
  const itemData = [
    req.params.userId,
    req.body.product_id,
    req.body.quantity,
  ];

  CartItem.addItem(itemData, (err) => {
    if (err) {
      return res.status(500).json({
        message: err.message,
      });
    }

    return res.status(201).json({
      message: "Item added to cart successfully",
    });
  });
};

const getCart = function (req, res) {
  CartItem.findByUserId(req.params.userId, (err, rows) => {
    if (err) {
      return res.status(500).json({
        message: err.message,
      });
    }

    if (!rows || rows.length === 0) {
      return res.status(200).json({
        message: "Cart is empty",
        data: [],
      });
    }

    return res.status(200).json({
      message: "Cart retrieved successfully",
      data: rows,
    });
  });
};

const updateQuantity = function (req, res) {
  const quantityData = [
    req.body.quantity,
    req.params.userId,
    req.params.productId,
  ];

  CartItem.updateQuantity(quantityData, function (err) {
    if (err) {
      return res.status(500).json({
        message: err.message,
      });
    }

    if (this.changes === 0) {
      return res.status(404).json({
        message: "Cart item not found",
      });
    }

    return res.status(200).json({
      message: "Quantity updated successfully",
    });
  });
};

const removeItem = function (req, res) {
  const cartItemData = [req.params.userId, req.params.productId];

  CartItem.removeItem(cartItemData, function (err) {
    if (err) {
      return res.status(500).json({
        message: err.message,
      });
    }

    if (this.changes === 0) {
      return res.status(404).json({
        message: "Cart item not found",
      });
    }

    return res.status(200).json({
      message: "Item removed successfully",
    });
  });
};

const clearCart = function (req, res) {
  CartItem.clearCart(req.params.userId, function (err) {
    if (err) {
      return res.status(500).json({
        message: err.message,
      });
    }

    if (this.changes === 0) {
      return res.status(200).json({
        message: "Cart is already empty",
      });
    }

    return res.status(200).json({
      message: "Cart cleared successfully",
    });
  });
};

module.exports = {
  addItem,
  getCart,
  updateQuantity,
  removeItem,
  clearCart,
};

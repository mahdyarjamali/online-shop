const Cart = require("../models/Cart");

const createCart = function (req, res) {
  const cartData = [req.body.user_id];

  Cart.createCart(cartData, (err) => {
    if (err) {
      return res.status(500).json({
        message: err.message,
      });
    }

    return res.status(201).json({
      message: "Cart created successfully",
    });
  });
};

const addToCart = function (req, res) {
  const cartItemData = [
    req.params.cartId,
    req.body.product_id,
    req.body.quantity,
  ];

  Cart.addToCart(cartItemData, (err) => {
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
  Cart.findByCartId(req.params.cartId, (err, rows) => {
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
    req.params.cartId,
    req.params.productId,
  ];

  Cart.updateQuantity(quantityData, function (err) {
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
  const cartItemData = [req.params.cartId, req.params.productId];

  Cart.removeItem(cartItemData, function (err) {
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
  Cart.clearCart(req.params.cartId, function (err) {
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
  createCart,
  addToCart,
  getCart,
  updateQuantity,
  removeItem,
  clearCart,
};

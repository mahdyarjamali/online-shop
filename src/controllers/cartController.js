const Cart = require("../models/Cart");

const createCart = function (req, res) {
  const cartData = [req.body.user_id];

  Cart.createCart(cartData, (err) => {
    if (err) {
      res.send(err.message);
    } else {
      res.send("cart created successfully");
    }
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
      res.send(err.message);
    } else {
      res.send("item added successfully");
    }
  });
};

const getCart = function (req, res) {
  Cart.findByCartId(req.params.cartId, (err, rows) => {
    if (err) {
      res.send(err.message);
    } else if (!rows || rows.length === 0) {
      res.send("cart is empty");
    } else {
      res.json(rows);
    }
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
      res.send(err.message);
    } else if (this.changes === 0) {
      res.send("cart item not found");
    } else {
      res.send("quantity updated successfully");
    }
  });
};

const removeItem = function (req, res) {
  const cartItemData = [req.params.cartId, req.params.productId];

  Cart.removeItem(cartItemData, function (err) {
    if (err) {
      res.send(err.message);
    } else if (this.changes === 0) {
      res.send("cart item not found");
    } else {
      res.send("item removed successfully");
    }
  });
};

const clearCart = function (req, res) {
  Cart.clearCart(req.params.cartId, function (err) {
    if (err) {
      res.send(err.message);
    } else if (this.changes === 0) {
      res.send("cart is already empty");
    } else {
      res.send("cart cleared successfully");
    }
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

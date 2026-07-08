const db = require("../db");

const Cart = {
  createCart: function (cartData, callback) {
    db.run(
      `insert into carts (user_id)
            values (?)`,
      cartData,
      callback,
    );
  },

  addToCart: function (cartItemData, callback) {
    db.run(
      `insert into cart_items (cart_id , product_id , quantity)
        values (? , ? , ?)`,
      cartItemData,
      callback,
    );
  },

  findByCartId: function (cartId, callback) {
    db.all(
      `select * from cart_items
        where cart_id = ?`,
      [cartId],
      callback,
    );
  },

  updateQuantity: function (cartItemData, callback) {
    db.run(
      `update cart_items 
        set quantity = ?
        where cart_id = ?
        and product_id = ?`,
      cartItemData,
      callback,
    );
  },

  removeItem: function (cartItemData, callback) {
    db.run(
      `delete from cart_items
        where cart_id = ?
        and product_id = ?`,
      cartItemData,
      callback,
    );
  },

  clearCart: function (cartId, callback) {
    db.run(
      `delete from cart_items
        where cart_id = ?`,
      [cartId],
      callback,
    );
  },
};

module.exports = Cart;

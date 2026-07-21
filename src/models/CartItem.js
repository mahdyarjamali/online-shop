const db = require("../db");

const CartItem = {
  addItem: function (itemData, callback) {
    db.run(
      `insert into cart_items (user_id , product_id , quantity)
        values (? , ? , ?)`,
      itemData,
      callback,
    );
  },

  findByUserId: function (userId, callback) {
    db.all(
      `select * from cart_items
        where user_id = ?`,
      [userId],
      callback,
    );
  },

  updateQuantity: function (cartItemData, callback) {
    db.run(
      `update cart_items 
        set quantity = ?
        where user_id = ?
        and product_id = ?`,
      cartItemData,
      callback,
    );
  },

  removeItem: function (cartItemData, callback) {
    db.run(
      `delete from cart_items
        where user_id = ?
        and product_id = ?`,
      cartItemData,
      callback,
    );
  },

  clearCart: function (userId, callback) {
    db.run(
      `delete from cart_items
        where user_id = ?`,
      [userId],
      callback,
    );
  },
};

module.exports = CartItem;

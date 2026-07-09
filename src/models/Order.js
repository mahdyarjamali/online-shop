const db = require("../db");

const Order = {
  createOrder: function (orderData, callback) {
    db.run(
      `insert into orders (user_id , total_price , status , address)
            values (? , ? , ? , ?)`,
      orderData,
      callback,
    );
  },

  addOrderItem: function (orderItemData, callback) {
    db.run(
      `insert into order_items (order_id, product_id, quantity, price)
        values (? , ? , ? , ?)`,
      orderItemData,
      callback,
    );
  },

  findAll: function (callback) {
    db.all(`select * from orders`, [], callback);
  },

  findById: function (id, callback) {
    db.get(
      `select * from orders
        where id = ?`,
      [id],
      callback,
    );
  },

  updateStatus: function (statusData, callback) {
    db.run(
      `update orders
        set status = ?
        where id = ?`,
      statusData,
      callback,
    );
  },

  deleteOrder: function (id, callback) {
    db.serialize(() => {
      db.run(
        `delete from order_items
            where order_id = ?`,
        [id],
      );
      db.run(
        `delete from orders
            where id = ?`,
        [id],
        callback,
      );
    });
  },
};

module.exports = Order;

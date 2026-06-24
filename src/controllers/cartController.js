const db = require("../db");

const createCart = function (req, res) {
  const cartData = [req.body.user_id];

  db.serialize(() => {
    db.run(
      `insert into carts (user_id)
      values (?)`,
      cartData,
      (err) => {
        if (err) {
          res.send(err.message);
        } else {
          res.send("cart created successfully");
        }
      },
    );
  });
};

const addToCart = function (req, res) {
  const cartItemData = [
    req.body.cart_id,
    req.body.product_id,
    req.body.quantity,
  ];

  db.serialize(() => {
    db.run(
      `insert into cart_items (cart_id , product_id , quantity)
            values (? , ? , ?)`,
      cartItemData,
      (err) => {
        if (err) {
          res.send(err.message);
        } else {
          res.send("item added successfully");
        }
      },
    );
  });
};

module.exports = {
  createCart,
  addToCart,
};

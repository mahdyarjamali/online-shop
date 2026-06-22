const express = require("express");
const router = express.Router();

const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("shop.db");

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
//
//
//
//
router.post("/cart_add", addToCart);
//
//
//
//
module.exports = router;

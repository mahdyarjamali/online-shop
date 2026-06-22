const express = require("express");
const router = express.Router();

const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("shop.db");

const createOrder = function (req, res) {
  const orderData = [
    req.body.user_id,
    req.body.total_price,
    req.body.status,
    req.body.address,
  ];

  db.serialize(() => {
    db.run(
      `insert into orders (user_id , total_price , status , address)
            values (? , ? , ? , ?)`,
      orderData,
      (err) => {
        if (err) {
          res.send(err.message);
        } else {
          res.send("order created successfully");
        }
      },
    );
  });
};

const createOrderDetails = function (req, res) {
  const orderInfo = [
    req.body.order_id,
    req.body.product_id,
    req.body.quantity,
    req.body.price,
  ];

  db.run(
    `insert into order_items (order_id , product_id , quantity , price)
        values (? , ? , ? , ?)`,
    orderInfo,
    (err) => {
      if (err) {
        res.send(err.message);
      } else {
        res.send("order item added successfully");
      }
    },
  );
};
//
//
//
//
router.post("/create-order", createOrder);
router.post("/order_add", createOrderDetails);
//
//
//
//
module.exports = router;

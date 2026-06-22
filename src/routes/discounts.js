const express = require("express");
const router = express.Router();

const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("shop.db");

const createDiscount = function (req, res) {
  const discountData = [
    req.body.code,
    req.body.percentage,
    req.body.expires_at,
  ];

  db.serialize(() => {
    db.run(
      `insert into discounts (code , percentage , expires_at)
            values (? , ? , ?)`,
      discountData,
      (err) => {
        if (err) {
          res.send(err.message);
        } else {
          res.send("Discount created successfully");
        }
      },
    );
  });
};
//
//
//
//
router.post("/create_discount", createDiscount);
//
//
//
//
module.exports = router;

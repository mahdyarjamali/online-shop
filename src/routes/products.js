const express = require("express");
const router = express.Router();

const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("shop.db");

const createProduct = function (req, res) {
  const productData = [
    req.body.name,
    req.body.description,
    req.body.price,
    req.body.category,
    req.body.stock,
    req.body.image,
  ];
  db.serialize(() => {
    db.run(
      `insert into products (name , description , price , category , stock , image)
            values (? , ? , ? , ? , ? , ?)`,
      productData,
      (err) => {
        if (err) {
          res.send(err.message);
        } else {
          res.send("product added successfully");
        }
      },
    );
  });
};
//
//
//
//
router.post("/create-product", createProduct);
//
//
//
//
module.exports = router;

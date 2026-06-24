const express = require("express");
const router = express.Router();

const cartController = require("../controllers/cartController")


router.post("/create_cart", cartController.createCart);
router.post("/cart_add", cartController.addToCart);


module.exports = router;

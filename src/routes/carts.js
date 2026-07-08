const express = require("express");
const router = express.Router();

const cartController = require("../controllers/cartController");

router.post("/create-cart", cartController.createCart);

router.post("/cart-add", cartController.addToCart);

router.get("/:cartId", cartController.getCart);

router.put("/update-quantity", cartController.updateQuantity);

router.delete("/remove-item", cartController.removeItem);

router.delete("/clear/:cartId", cartController.clearCart);

module.exports = router;

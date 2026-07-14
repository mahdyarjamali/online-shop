const express = require("express");
const router = express.Router();

const cartController = require("../controllers/cartController");

router.post("/", cartController.createCart);

router.post("/:cartId/items", cartController.addToCart);

router.get("/:cartId", cartController.getCart);

router.put("/:cartId/items/:productId", cartController.updateQuantity);

router.delete("/:cartId/items/:productId", cartController.removeItem);

router.delete("/:cartId/items", cartController.clearCart);

module.exports = router;

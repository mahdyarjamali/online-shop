const express = require("express");
const router = express.Router();

const cartController = require("../controllers/cartController");

router.post("/:userId/items", cartController.addItem);

router.get("/:userId", cartController.getCart);

router.put("/:userId/items/:productId", cartController.updateQuantity);

router.delete("/:userId/items/:productId", cartController.removeItem);

router.delete("/:userId/items", cartController.clearCart);

module.exports = router;

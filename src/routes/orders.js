const express = require("express");
const router = express.Router();

const orderController = require("../controllers/orderController");

router.post("/", orderController.createOrder);

router.post("/:orderId/items", orderController.addOrderItem);

router.get("/", orderController.getAllOrders);

router.get("/:id", orderController.getOrderById);

router.put("/:id", orderController.updateStatus);

router.delete("/:id", orderController.deleteOrder);

module.exports = router;

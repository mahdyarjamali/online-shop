const express = require("express");
const router = express.Router();

const orderController = require("../controllers/orderController");

router.post("/create-order", orderController.createOrder);
router.post("/order-add", orderController.createOrderDetails);

module.exports = router;

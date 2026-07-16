const Order = require("../models/Order");

const createOrder = function (req, res) {
  const orderData = [
    req.body.user_id,
    req.body.total_price,
    req.body.status,
    req.body.address,
  ];

  Order.createOrder(orderData, (err) => {
    if (err) {
      return res.status(500).json({
        message: err.message,
      });
    }

    return res.status(201).json({
      message: "Order created successfully",
    });
  });
};

const addOrderItem = function (req, res) {
  const orderItemData = [
    req.params.orderId,
    req.body.product_id,
    req.body.quantity,
    req.body.price,
  ];

  Order.addOrderItem(orderItemData, (err) => {
    if (err) {
      return res.status(500).json({
        message: err.message,
      });
    }

    return res.status(201).json({
      message: "Order item added successfully",
    });
  });
};

const getAllOrders = function (req, res) {
  Order.findAll((err, rows) => {
    if (err) {
      return res.status(500).json({
        message: err.message,
      });
    }

    return res.status(200).json({
      message: "Orders retrieved successfully",
      data: rows,
    });
  });
};

const getOrderById = function (req, res) {
  Order.findById(req.params.id, (err, row) => {
    if (err) {
      return res.status(500).json({
        message: err.message,
      });
    }

    if (!row) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    return res.status(200).json({
      message: "Order retrieved successfully",
      data: row,
    });
  });
};

const updateStatus = function (req, res) {
  const statusData = [req.body.status, req.params.id];

  Order.updateStatus(statusData, function (err) {
    if (err) {
      return res.status(500).json({
        message: err.message,
      });
    }

    if (this.changes === 0) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    return res.status(200).json({
      message: "Order status updated successfully",
    });
  });
};

const deleteOrder = function (req, res) {
  Order.deleteOrder(req.params.id, function (err) {
    if (err) {
      return res.status(500).json({
        message: err.message,
      });
    }

    if (this.changes === 0) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    return res.status(200).json({
      message: "Order deleted successfully",
    });
  });
};

module.exports = {
  createOrder,
  addOrderItem,
  getAllOrders,
  getOrderById,
  updateStatus,
  deleteOrder,
};

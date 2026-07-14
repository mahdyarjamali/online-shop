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
      res.send(err.message);
    } else {
      res.send("order created successfully");
    }
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
      res.send(err.message);
    } else {
      res.send("order item added successfully");
    }
  });
};

const getAllOrders = function (req, res) {
  Order.findAll((err, rows) => {
    if (err) {
      res.send(err.message);
    } else {
      res.json(rows);
    }
  });
};

const getOrderById = function (req, res) {
  Order.findById(req.params.id, (err, row) => {
    if (err) {
      res.send(err.message);
    } else if (!row) {
      res.send("order not found");
    } else {
      res.json(row);
    }
  });
};

const updateStatus = function (req, res) {
  const statusData = [req.body.status, req.params.id];

  Order.updateStatus(statusData, function (err) {
    if (err) {
      res.send(err.message);
    } else if (this.changes === 0) {
      res.send("order not found");
    } else {
      res.send("order status updated successfully");
    }
  });
};

const deleteOrder = function (req, res) {
  Order.deleteOrder(req.params.id, function (err) {
    if (err) {
      res.send(err.message);
    } else if (this.changes === 0) {
      res.send("order not found");
    } else {
      res.send("order deleted successfully");
    }
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

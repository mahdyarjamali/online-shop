const User = require("../models/User");

const getAllUsers = function (req, res) {
  User.findAll((err, rows) => {
    if (err) {
      return res.status(500).json({
        message: err.message,
      });
    }

    return res.status(200).json({
      message: "Users retrieved successfully",
      data: rows,
    });
  });
};

const getUserById = function (req, res) {
  User.findById(req.params.id, (err, row) => {
    if (err) {
      return res.status(500).json({
        message: err.message,
      });
    }

    if (!row) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      message: "User retrieved successfully",
      data: row,
    });
  });
};

const updateUser = function (req, res) {
  const userData = [
    req.body.name,
    req.body.email,
    req.body.password,
    req.body.phone,
    req.body.role,
    req.body.address,
    req.params.id,
  ];

  User.updateUser(userData, function (err) {
    if (err) {
      return res.status(500).json({
        message: err.message,
      });
    }

    if (this.changes === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      message: "User updated successfully",
    });
  });
};

const deleteUser = function (req, res) {
  User.deleteUser(req.params.id, function (err) {
    if (err) {
      return res.status(500).json({
        message: err.message,
      });
    }

    if (this.changes === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      message: "User deleted successfully",
    });
  });
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};

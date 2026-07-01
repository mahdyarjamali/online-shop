const User = require("../models/User");

const getAllUsers = function (req, res) {
  User.findAll((err, rows) => {
    if (err) {
      res.send(err.message);
    } else {
      res.json(rows);
    }
  });
};

const getUserById = function (req, res) {
  User.findById(req.params.id, (err, row) => {
    if (err) {
      res.send(err.message);
    } else if (!row) {
      res.send("user not found");
    } else {
      res.json(row);
    }
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
      res.send(err.message);
    } else if (this.changes === 0) {
      res.send("user not found");
    } else {
      res.send("user updated successfully");
    }
  });
};

const deleteUser = function (req, res) {
  User.deleteUser(req.params.id, function (err) {
    if (err) {
      res.send(err.message);
    } else if (this.changes === 0) {
      res.send("user not found");
    } else {
      res.send("user deleted successfully");
    }
  });
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};

const User = require("../models/User");

const register = function (req, res) {
  const userData = [
    req.body.name,
    req.body.email,
    req.body.password,
    req.body.phone,
    req.body.role,
    req.body.address,
  ];

  User.create(userData, (err) => {
    if (err) {
      res.send(err.message);
    } else {
      res.send("user added successfully");
    }
  });
};

const login = function (req, res) {
  const loginData = [req.body.email, req.body.password];

  User.findByEmailAndPassword(loginData, (err, row) => {
    if (err) {
      res.send(err.message);
    } else if (!row) {
      res.send("Invalid email or password");
    } else {
      res.send("Login successful");
    }
  });
};

const logout = function (req, res) {
  res.send("Logout successful");
};

const me = function (req, res) {
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

const resetPassword = function (req, res) {
  const passwordData = [req.body.newPassword, req.body.email];

  User.resetPassword(passwordData, function (err) {
    if (err) {
      res.send(err.message);
    } else if (this.changes === 0) {
      res.send("user not found");
    } else {
      res.send("Password updated successfully");
    }
  });
};

module.exports = {
  register,
  login,
  logout,
  me,
  resetPassword,
};

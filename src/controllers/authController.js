const User = require("../models/User");
const bcrypt = require("bcrypt");

const register = async function (req, res) {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const userData = [
      req.body.name,
      req.body.email,
      hashedPassword,
      req.body.phone,
      req.body.role,
      req.body.address,
    ];

    User.create(userData, (err) => {
      if (err) {
        return res.status(500).json({
          message: err.message,
        });
      }

      return res.status(201).json({
        message: "User registered successfully",
      });
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const login = async function (req, res) {
  try {
    User.findByEmail(req.body.email, async (err, row) => {
      if (err) {
        return res.status(500).json({
          message: err.message,
        });
      }

      if (!row) {
        return res.status(401).json({
          message: "Invalid email or password",
        });
      }

      const isMatch = await bcrypt.compare(req.body.password, row.password);
      if (!isMatch) {
        return res.status(401).json({
          message: "Invalid email or password",
        });
      }

      req.session.userId = row.id;

      return res.status(200).json({
        message: "Login successful",
      });
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const logout = function (req, res) {
  if (!req.session.userId) {
    return res.status(200).json({
      message: "Already logged out",
    });
  }

  req.session.destroy(function (err) {
    if (err) {
      return res.status(500).json({
        message: err.message,
      });
    }

    return res.status(200).json({
      message: "Logout successful",
    });
  });
};

const me = function (req, res) {
  User.findById(req.session.userId, (err, row) => {
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

const resetPassword = function (req, res) {
  const passwordData = [req.body.newPassword, req.body.email];

  User.resetPassword(passwordData, function (err) {
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
      message: "Password updated successfully",
    });
  });
};

module.exports = {
  register,
  login,
  logout,
  me,
  resetPassword,
};

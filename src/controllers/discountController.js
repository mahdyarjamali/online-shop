const db = require("../db");

const createDiscount = function (req, res) {
  const discountData = [
    req.body.code,
    req.body.percentage,
    req.body.expires_at,
  ];

  db.serialize(() => {
    db.run(
      `insert into discounts (code , percentage , expires_at)
            values (? , ? , ?)`,
      discountData,
      (err) => {
        if (err) {
          res.send(err.message);
        } else {
          res.send("Discount created successfully");
        }
      },
    );
  });
};

module.exports = {
  createDiscount,
};

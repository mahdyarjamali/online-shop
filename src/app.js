const express = require("express");
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/products");
const cartRoutes = require("./routes/carts");
const orderRoutes = require("./routes/orders");
const discountRoutes = require("./routes/discounts");
const userRoutes = require("./routes/users")

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//auth routes:
app.use("/api/auth", authRoutes);

// product routes:
app.use("/api/products", productRoutes);

// cart routes:
app.use("/api/carts", cartRoutes);

// order routes:
app.use("/api/orders", orderRoutes);

// discount routes:
app.use("/api/discounts", discountRoutes);

// discount routes:
app.use("/api/users" , userRoutes)

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});

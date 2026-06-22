const express = require("express");
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/products");
const cartRoutes = require("./routes/carts");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//auth routes:
app.use("/api/auth", authRoutes);

// product routes:
app.use("/api/products", productRoutes);

// cart routes:
app.use("/api/carts", cartRoutes);


app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});

const express = require("express");
const authRoutes = require("./routes/auth");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//auth routes:
app.use("/api/auth", authRoutes);

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});

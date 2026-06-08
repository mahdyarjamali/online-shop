const express = require("express")
const authRoutes = require("./routes/auth")
const app = express()

app.use("/api" , authRoutes)

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})
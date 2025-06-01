const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const { connectDB } = require("./config/db");
const productRoutes = require("./routes/product.route");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/products", productRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));
  app.get("{*splat}", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  connectDB();
  console.log(`server running on http://localhost:${PORT}`);
});

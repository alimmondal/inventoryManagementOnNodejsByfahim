const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const { colors } = require("colors");
const productRoute = require("./routes/product.route");
const brandRoute = require("./routes/brand.route");
const storeRoute = require("./routes/store.route");
const categoryRoute = require("./routes/category.route");
const supplierRoute = require("./routes/supplier.route");
const stockRoute = require("./routes/stock.route");
const userRoute = require("./routes/user.route");
const verifyToken = require("./middleware/verifyToken");

// middle wares
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello, ema watson");
});

//posting to database
app.use("/api/v1/product", productRoute);
app.use("/api/v1/brand", brandRoute);
app.use("/api/v1/store", storeRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/supplier", supplierRoute);
app.use("/api/v1/stock", stockRoute);
app.use("/api/v1/user", userRoute);

module.exports = app;

const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const { colors } = require("colors");
const productRoute = require("./routes/product.route");
const brandRoute = require("./routes/brand.route");

// middle wares
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello, ema watson");
});

//posting to database
app.use("/api/v1/product", productRoute);
app.use("/api/v1/brand", brandRoute);

module.exports = app;
